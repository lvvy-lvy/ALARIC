import { reactive, computed } from 'vue';

export const sharedState = reactive({
  music: {
    cache: {} as { [key: string]: any },
    regex: /<bgm>当前bgm[:：](.+?) - (.+?)<\/bgm>/g,
    list: [] as any[],
    index: -1,
    autoPlayer: false,
    async getAllChatMessages() {
      this.index = -1;
      const lastId = await triggerSlash('/pass {{lastMessageId}}');
      if (!lastId) {
        return;
      }
      const list = [];
      const ChatMessages = await getChatMessages(`0-${lastId}`, { role: 'all' });
      for (const message of ChatMessages) {
        const matches = [...message.message.matchAll(this.regex)];
        if (matches.length == 0) {
          continue;
        }

        // 取到多个格式,取最后一个
        const match = matches.at(-1)!;
        const obj = {
          song: match[1],
          singer: match[2],
          message_id: message.message_id,
        };

        list.push(obj);
      }
      this.list = list;

      console.log(this.list);
      if (list.length > 0) {
        this.index = list.length - 1;
      }
    },
    async checkAudioAvailability(url: string): Promise<boolean> {
      return new Promise(resolve => {
        // 创建测试用音频对象
        const tester = new Audio();
        let timer: number;

        // 成功加载元数据
        const onLoaded = () => {
          cleanup();
          resolve(true);
        };

        // 发生错误或超时
        const onError = () => {
          cleanup();
          resolve(false);
        };

        // 清理事件监听
        const cleanup = () => {
          tester.removeEventListener('loadedmetadata', onLoaded);
          tester.removeEventListener('error', onError);
          clearTimeout(timer);
          tester.src = ''; // 释放资源
        };

        // 设置检测参数
        tester.preload = 'metadata';
        tester.src = url;
        timer = setTimeout(onError, 3000) as unknown as number; // 3秒超时

        // 绑定事件监听
        tester.addEventListener('loadedmetadata', onLoaded);
        tester.addEventListener('error', onError);
      });
    },
  },
});
