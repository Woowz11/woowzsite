(() => {
  const API_KEY  = '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';
  const MODEL    = 'moonshotai/kimi-k2:free';
  const ENDPOINT = 'https://openrouter.ai/api/v1/chat/completions';

  class WoowzAI {
    constructor(startMemory = [], { remember = true } = {}) {
      this.remember = remember;

      // стартовая история
      this.startHistory = startMemory.map((item, idx) =>
        typeof item === 'string'
          ? { role: idx % 2 === 0 ? 'user' : 'ai', content: item }
          : item
      );

      // рабочая история
      this.history = [...this.startHistory];
    }

    /* ----------  потоковая отправка ---------- */
    async send(message, { onChunk = () => {}, onDone = () => {}, onStage = () => {} } = {}) {
      if (!message) return;

      // если remember=false, всегда используем копию стартовой истории
      const base = this.remember ? this.history : [...this.startHistory];
      const messagesToSend = [...base];

      if (this.remember) {
        messagesToSend.push({ role: 'user', content: message });
      } else {
        messagesToSend.push({ role: 'user', content: message });
      }

      const cleanMessages = messagesToSend.map(({ role, content }) => ({
        role: role === 'ai' ? 'assistant' : role,
        content
      }));

      const body = { model: MODEL, messages: cleanMessages, stream: true };

      onStage('thinking');
      try {
        const res = await fetch(ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${API_KEY}`
          },
          body: JSON.stringify(body)
        });
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let answer = '';
        onStage('streaming');

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const lines = decoder.decode(value, { stream: true }).split('\n');
          for (const line of lines) {
            if (!line.startsWith('data: ')) continue;
            const chunk = line.slice(6).trim();
            if (chunk === '[DONE]') break;
            try {
              const json = JSON.parse(chunk);
              const delta = json.choices?.[0]?.delta?.content;
              if (delta) {
                answer += delta;
                onChunk(delta);
              }
            } catch {}
          }
        }

        if (this.remember) {
          this.history.push({ role: 'user', content: message });
          this.history.push({ role: 'ai', content: answer });
        }
        onStage('done');
        return answer;
      } catch (err) {
        onStage('error');
        throw err;
      }
    }

    /* ----------  одним куском ---------- */
    async sendSync(message) {
      const base = this.remember ? this.history : [...this.startHistory];
      const messagesToSend = [...base, { role: 'user', content: message }];

      const cleanMessages = messagesToSend.map(({ role, content }) => ({
        role: role === 'ai' ? 'assistant' : role,
        content
      }));

      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${API_KEY}` },
        body: JSON.stringify({ model: MODEL, messages: cleanMessages })
      });
      const data = await res.json();
      const answer = data.choices?.[0]?.message?.content || '';

      if (this.remember) {
        this.history.push({ role: 'user', content: message });
        this.history.push({ role: 'ai', content: answer });
      }
      return answer;
    }

    /* ----------  работа с памятью ---------- */
    addMemory(role, text) {
      if (this.remember) this.history.push({ role, content: text });
    }
    getHistory() { return [...this.history]; }
    clearMemory() { this.history = [...this.startHistory]; }
  }

  window.WoowzAI = WoowzAI;
})();