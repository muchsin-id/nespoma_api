import { Injectable } from '@nestjs/common';
import { join } from 'path';
import * as fs from 'fs';
import { marked } from 'marked';

@Injectable()
export class AppService {
  async getHome(res: any) {
    const html = join(__dirname, '..', 'client', 'index.html');
    res.sendFile(html);
  }
  async getReadme(res: any) {
    const readmePath = join(__dirname, '..', 'README.md');
    const markdown = await fs.promises.readFile(readmePath, 'utf8');
    const html = marked(markdown);
    res.send(html);
  }
}
