import { promises as fs } from 'fs';

export async function saveIt(str: string): Promise<string> {
  await stall();
  await fs.appendFile('/tmp/saved.txt', str);
  const content = await fs.readFile('/tmp/saved.txt', 'utf8');
  console.log(content);

  return content;
}

async function stall(stallTime = 10000) {
  console.log('Waiting.')
  await new Promise(resolve => setTimeout(resolve, stallTime));
}