import { promises as fs } from 'fs';

export async function saveIt(str: string): Promise<string> {
  await stall();
  await fs.appendFile('saved.txt', str);
  const content = await fs.readFile('saved.txt', 'utf8');
  console.log(content);

  return content;
}

async function stall(stallTime = 30000) {
  console.log('Waiting.')
  await new Promise(resolve => setTimeout(resolve, stallTime));
}