import { readFileSync } from 'fs';
import { join } from 'path';

describe('hello', function () {
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
});
