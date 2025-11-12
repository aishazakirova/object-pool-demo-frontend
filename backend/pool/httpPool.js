class HttpClient {
    constructor(id) {
      this.id = id;
      this.busy = false;
    }
  
    async request(url) {
      this.busy = true;
      console.log(`🌐 Client ${this.id} handling request to ${url}`);
      await new Promise((r) => setTimeout(r, 1000)); // simulate delay
      this.busy = false;
      console.log(`✅ Client ${this.id} finished request`);
      return { client: this.id, data: `Response from ${url}` };
    }
  }
  
  class ObjectPool {
    constructor(size) {
      this.pool = Array.from({ length: size }, (_, i) => new HttpClient(i + 1));
    }
  
    acquire() {
      const client = this.pool.find((c) => !c.busy);
      if (!client) throw new Error("❌ All clients are busy!");
      return client;
    }
  
    getStatus() {
      return this.pool.map((c) => ({ id: c.id, busy: c.busy }));
    }
  }
  
  const httpPool = new ObjectPool(3);
  export default httpPool;
  
  