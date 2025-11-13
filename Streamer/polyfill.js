// Streamer By Wraiths (KapBilly7581 sadece projeyi geliştirmiş ve bot ile eşleştirme yapmıştır.)
const { Readable } = require('stream');
// Streamer By Wraiths (KapBilly7581 sadece projeyi geliştirmiş ve bot ile eşleştirme yapmıştır.)
if (typeof globalThis.File === 'undefined') {
  globalThis.File = class File {
    constructor(chunks, filename, options = {}) {
      this.name = filename;
      this.type = options.type || '';
      this.lastModified = options.lastModified || Date.now();
      this.webkitRelativePath = '';
// Streamer By Wraiths (KapBilly7581 sadece projeyi geliştirmiş ve bot ile eşleştirme yapmıştır.)
      this._chunks = Array.isArray(chunks) ? chunks.map(c => {
        if (Buffer.isBuffer(c)) return c;
        if (typeof c === 'string') return Buffer.from(c);
        return Buffer.from([]);
      }) : [];
// Streamer By Wraiths (KapBilly7581 sadece projeyi geliştirmiş ve bot ile eşleştirme yapmıştır.)
      this.size = this._chunks.reduce((acc, c) => acc + c.length, 0);
    }
// Streamer By Wraiths (KapBilly7581 sadece projeyi geliştirmiş ve bot ile eşleştirme yapmıştır.)
    slice(start = 0, end = this.size, contentType = this.type) {
      const slicedChunks = [];
      let copied = 0;
// Streamer By Wraiths (KapBilly7581 sadece projeyi geliştirmiş ve bot ile eşleştirme yapmıştır.)
      for (const chunk of this._chunks) {
        if (copied + chunk.length <= start) {
          copied += chunk.length;
          continue;
        }
        if (copied >= end) break;
// Streamer By Wraiths (KapBilly7581 sadece projeyi geliştirmiş ve bot ile eşleştirme yapmıştır.)
        const s = Math.max(0, start - copied);
        const e = Math.min(chunk.length, end - copied);
        slicedChunks.push(chunk.slice(s, e));
        copied += chunk.length;
      }
// Streamer By Wraiths (KapBilly7581 sadece projeyi geliştirmiş ve bot ile eşleştirme yapmıştır.)
      return new File(slicedChunks, this.name, { type: contentType, lastModified: this.lastModified });
    }
// Streamer By Wraiths (KapBilly7581 sadece projeyi geliştirmiş ve bot ile eşleştirme yapmıştır.)
    stream() {
      return Readable.from(this._chunks);
    }
// Streamer By Wraiths (KapBilly7581 sadece projeyi geliştirmiş ve bot ile eşleştirme yapmıştır.)
    text() {
      return Promise.resolve(Buffer.concat(this._chunks).toString());
    }
// Streamer By Wraiths (KapBilly7581 sadece projeyi geliştirmiş ve bot ile eşleştirme yapmıştır.)
    arrayBuffer() {
      return Promise.resolve(Uint8Array.from(Buffer.concat(this._chunks)).buffer);
    }
  };
}
// Streamer By Wraiths (KapBilly7581 sadece projeyi geliştirmiş ve bot ile eşleştirme yapmıştır.)
if (typeof globalThis.Blob === 'undefined') {
  globalThis.Blob = class Blob {
    constructor(chunks = [], options = {}) {
      this.type = options.type || '';
      this._chunks = Array.isArray(chunks) ? chunks.map(c => {
        if (Buffer.isBuffer(c)) return c;
        if (typeof c === 'string') return Buffer.from(c);
        return Buffer.from([]);
      }) : [];
// Streamer By Wraiths (KapBilly7581 sadece projeyi geliştirmiş ve bot ile eşleştirme yapmıştır.)
      this.size = this._chunks.reduce((acc, c) => acc + c.length, 0);
    }
// Streamer By Wraiths (KapBilly7581 sadece projeyi geliştirmiş ve bot ile eşleştirme yapmıştır.)
    slice(start = 0, end = this.size, contentType = this.type) {
      const slicedChunks = [];
      let copied = 0;
// Streamer By Wraiths (KapBilly7581 sadece projeyi geliştirmiş ve bot ile eşleştirme yapmıştır.)
      for (const chunk of this._chunks) {
        if (copied + chunk.length <= start) {
          copied += chunk.length;
          continue;
        }
        if (copied >= end) break;
// Streamer By Wraiths (KapBilly7581 sadece projeyi geliştirmiş ve bot ile eşleştirme yapmıştır.)
        const s = Math.max(0, start - copied);
        const e = Math.min(chunk.length, end - copied);
        slicedChunks.push(chunk.slice(s, e));
        copied += chunk.length;
      }
// Streamer By Wraiths (KapBilly7581 sadece projeyi geliştirmiş ve bot ile eşleştirme yapmıştır.)
      return new Blob(slicedChunks, { type: contentType });
    }
// Streamer By Wraiths (KapBilly7581 sadece projeyi geliştirmiş ve bot ile eşleştirme yapmıştır.)
    stream() {
      return Readable.from(this._chunks);
    }
// Streamer By Wraiths (KapBilly7581 sadece projeyi geliştirmiş ve bot ile eşleştirme yapmıştır.)
    text() {
      return Promise.resolve(Buffer.concat(this._chunks).toString());
    }
// Streamer By Wraiths (KapBilly7581 sadece projeyi geliştirmiş ve bot ile eşleştirme yapmıştır.)
    arrayBuffer() {
      return Promise.resolve(Uint8Array.from(Buffer.concat(this._chunks)).buffer);
    }
  };
}
// Streamer By Wraiths (KapBilly7581 sadece projeyi geliştirmiş ve bot ile eşleştirme yapmıştır.)