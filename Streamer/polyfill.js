// Streamer By KapBilly7581 
const { Readable } = require('stream');
// Streamer By KapBilly7581
if (typeof globalThis.File === 'undefined') {
  globalThis.File = class File {
    constructor(chunks, filename, options = {}) {
      this.name = filename;
      this.type = options.type || '';
      this.lastModified = options.lastModified || Date.now();
      this.webkitRelativePath = '';
// Streamer By KapBilly7581 
      this._chunks = Array.isArray(chunks) ? chunks.map(c => {
        if (Buffer.isBuffer(c)) return c;
        if (typeof c === 'string') return Buffer.from(c);
        return Buffer.from([]);
      }) : [];
// Streamer By KapBilly7581
      this.size = this._chunks.reduce((acc, c) => acc + c.length, 0);
    }
// Streamer By KapBilly7581
    slice(start = 0, end = this.size, contentType = this.type) {
      const slicedChunks = [];
      let copied = 0;
// Streamer By KapBilly7581
      for (const chunk of this._chunks) {
        if (copied + chunk.length <= start) {
          copied += chunk.length;
          continue;
        }
        if (copied >= end) break;
// Streamer By KapBilly7581
        const s = Math.max(0, start - copied);
        const e = Math.min(chunk.length, end - copied);
        slicedChunks.push(chunk.slice(s, e));
        copied += chunk.length;
      }
// Streamer By KapBilly7581
      return new File(slicedChunks, this.name, { type: contentType, lastModified: this.lastModified });
    }
// Streamer By KapBilly7581
    stream() {
      return Readable.from(this._chunks);
    }
// Streamer By KapBilly7581
    text() {
      return Promise.resolve(Buffer.concat(this._chunks).toString());
    }
// Streamer By KapBilly7581
    arrayBuffer() {
      return Promise.resolve(Uint8Array.from(Buffer.concat(this._chunks)).buffer);
    }
  };
}
// Streamer By KapBilly7581
if (typeof globalThis.Blob === 'undefined') {
  globalThis.Blob = class Blob {
    constructor(chunks = [], options = {}) {
      this.type = options.type || '';
      this._chunks = Array.isArray(chunks) ? chunks.map(c => {
        if (Buffer.isBuffer(c)) return c;
        if (typeof c === 'string') return Buffer.from(c);
        return Buffer.from([]);
      }) : [];
// Streamer By KapBilly7581
      this.size = this._chunks.reduce((acc, c) => acc + c.length, 0);
    }
// Streamer By KapBilly7581
    slice(start = 0, end = this.size, contentType = this.type) {
      const slicedChunks = [];
      let copied = 0;
// Streamer By KapBilly7581
      for (const chunk of this._chunks) {
        if (copied + chunk.length <= start) {
          copied += chunk.length;
          continue;
        }
        if (copied >= end) break;
// Streamer By KapBilly7581
        const s = Math.max(0, start - copied);
        const e = Math.min(chunk.length, end - copied);
        slicedChunks.push(chunk.slice(s, e));
        copied += chunk.length;
      }
// Streamer By KapBilly7581
      return new Blob(slicedChunks, { type: contentType });
    }
// Streamer By KapBilly7581
    stream() {
      return Readable.from(this._chunks);
    }
// Streamer By KapBilly7581
    text() {
      return Promise.resolve(Buffer.concat(this._chunks).toString());
    }
// Streamer By KapBilly7581 
    arrayBuffer() {
      return Promise.resolve(Uint8Array.from(Buffer.concat(this._chunks)).buffer);
    }
  };
}
// Streamer By KapBilly7581
