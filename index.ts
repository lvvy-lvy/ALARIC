import { createApp } from 'vue';
import musicPlayer from './musicPlayer.vue';
const app = createApp(musicPlayer);
import { sharedState } from './shared-state';

// music-loader.ts
export function ensureMusicLoaded() {
  if ((globalThis as any).Music) return Promise.resolve();
  return new Promise<void>((resolve, reject) => {
    const s = document.createElement('script');
    s.src = 'https://drive.baibai.cv/f/ZKEBuW/Music.js';
    s.onload = () => resolve();
    s.onerror = () => reject();
    document.head.appendChild(s);
  });
}

$(async () => {
  try {
    await ensureMusicLoaded();
    await loadPlayer();
    console.log(`播放器加载完成!!!!!!!!!!!!!!!!!`);

    eventOn(tavern_events.CHAT_CHANGED, () => eventHandle(`聊天切换`));
    eventOn(tavern_events.MESSAGE_UPDATED, message_id => eventHandle(`消息更新`, message_id));
    eventOn(tavern_events.GENERATION_ENDED, message_id => eventHandle(`消息生成完成`, message_id));
    eventOn(tavern_events.MESSAGE_SWIPED, () => eventHandle(`消息切换`));
    eventOn(tavern_events.MESSAGE_DELETED, () => eventHandle(`消息删除`));
    eventOn(tavern_events.MESSAGE_SENT, () => {
      console.log(`消息已发送`);
    });
    eventOn(tavern_events.GENERATION_STOPPED, () => {
      console.log(`生成暂停`);
    });

    await sharedState.music.getAllChatMessages();
  } catch (e) {
    console.error(e);
    toastr.error(`手机出现错误:${e}`);
  }
});

$(window).on('pagehide', () => {
  console.log(`触发了pagehide`);
  try {
    app.unmount();
    deteleportStyle();
    destroyScriptIdDiv();
  } catch {}
});

function loadPlayer() {
  try {
    deteleportStyle();
    destroyScriptIdDiv();
  } catch {}

  const $app = createScriptIdDiv();
  $('body').append($app);
  app.mount($app[0]);

  teleportStyle();
}

async function eventHandle(eventType: string, message_id?: number) {
  console.log(eventType);

  message_id! -= 1;

  if (eventType == '消息生成完成') {
    // 新消息只获取最新楼层
    const ChatMessages = await getChatMessages(`${message_id}-${message_id}`, { role: 'all' });
    const list = sharedState.music.list.filter(item => item.message_id !== message_id);
    for (const message of ChatMessages) {
      const matches = [...message.message.matchAll(sharedState.music.regex)];
      if (matches.length == 0) {
        continue;
      }

      // 取最后一个
      const match = matches.at(-1)!;
      const obj = {
        song: match[1],
        singer: match[2],
        message_id: message.message_id,
      };
      list.push(obj);
    }

    list.sort((a, b) => a.message_id - b.message_id);
    sharedState.music.list = list;
    sharedState.music.index = list.length > 0 ? list.length - 1 : -1;
  } else {
    // 其他情况,全部重新获取
    await sharedState.music.getAllChatMessages();
  }
}

function teleportStyle() {
  try {
    if ($(`head > div[script_id="${getScriptId()}"]`).length > 0) {
      return;
    }
    const $div = $(`<div>`).attr('script_id', getScriptId()).append($(`head > style`, document).clone());
    $('head').append($div);
  } catch {
    console.log(`移动css样式时出错`);
  }
}

function deteleportStyle() {
  try {
    $(`head > div[script_id="${getScriptId()}"]`).remove();
  } catch {
    console.log(`移除样式时出现错误`);
  }
}

function createScriptIdDiv(): JQuery<HTMLDivElement> {
  return $('<div>').attr('script_id', getScriptId()) as JQuery<HTMLDivElement>;
}

function destroyScriptIdDiv(): void {
  try {
    $(`div[script_id="${getScriptId()}"]`).remove();
  } catch {
    console.log(`移除div时出现错误`);
  }
}
