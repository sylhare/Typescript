import { readFileSync } from 'fs';
import { join } from 'path';

describe('Files handler', function () {
  const job = JSON.parse(readFileSync(join(process.cwd(), 'tests', 'files', 'job.json'), 'utf8'));
  const client = { send: jest.fn().mockResolvedValue('Ok') };

  enum Status {
    SUCCEEDED,
    FAILED
  }

  async function handle(job: any): Promise<any> {
    console.log(job.id);
    const answer = { id: job.id, timestamp: new Date().toISOString() };

    return client.send(job.willFail ?
      { ...answer, status: Status.FAILED, token: 'new-uuid-token' }
      : { ...answer, status: Status.SUCCEEDED });
  }

  it('success', async () => {
    await expect(handle(job)).resolves.toEqual('Ok');
    expect(client.send).toHaveBeenCalledWith({ id: expect.any(String), status: Status.SUCCEEDED, timestamp: expect.any(String) });
  });

  it('failure', async () => {
    await expect(handle({ ...job, willFail: true })).resolves.toEqual('Ok');
    expect(client.send)
      .toHaveBeenCalledWith({ id: expect.any(String), status: Status.FAILED, timestamp: expect.any(String), token: expect.any(String) });
  });

  describe('Buffer', () => {

    it('Transform into a Buffer', () => {
      const buffer = Buffer.from(JSON.stringify(job));
      expect(typeof buffer).toEqual('object');
      expect(buffer.toJSON()).toMatchObject({ data: expect.arrayContaining([expect.any(Number)]), type: 'Buffer' });
      expect(JSON.parse(buffer.toString())).toEqual(job);
    });

    it('Buffer inception', () => {
      const buffer = Buffer.from(JSON.stringify({ hello: 'world' }));
      const bufferBuffer = Buffer.from(buffer);
      expect(bufferBuffer).toEqual(buffer);
      expect(bufferBuffer.toJSON()).toMatchObject({
        data: [123, 34, 104, 101, 108, 108, 111, 34, 58, 34, 119, 111, 114, 108, 100, 34, 125], type: 'Buffer'
      });
      expect(JSON.parse(bufferBuffer.toString())).toEqual({ hello: 'world' });
    });

    it('transforms buffered data array into an object', () => {
      expect(JSON.parse(Buffer.from(
        [123, 34, 104, 101, 108, 108, 111, 34, 58, 34, 119, 111, 114, 108, 100, 34, 125]
      ).toString())).toEqual({ hello: 'world' });
    });
  });
});
