<template>
  <div
    id="vinylWidget"
    ref="widget"
    class="vinyl-widget"
    :class="{
      'is-expanded': isExpanded,
      'is-dragging': isDragging,
      'is-playing': isPlaying
    }"
    :style="`top:${dragY};left:${dragX}`"
    @mousedown="startDrag"
    @touchstart="startDrag"
    @dblclick="handleDoubleClick"
    @contextmenu="onContextMenu"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <!-- 动态背景效果 -->
    <div v-if="isExpanded && showParticles" class="background-effects">
      <div
        v-for="i in 12"
        :key="'particle-' + i"
        class="particle"
        :class="i % 3 === 0 ? 'snow' : 'bubble'"
        :style="{
          left: `${Math.random() * 100}%`,
          animationDelay: `${i * 0.5}s`,
          animationDuration: `${4 + Math.random() * 3}s`
        }"
      ></div>
    </div>

    <!-- 悬浮球状态 - 黑胶唱片外观 -->
    <div v-if="!isExpanded" class="vinyl-mini">
      <div class="vinyl-mini-disc" :class="{ playing: isPlaying }">
        <div class="vinyl-mini-label"></div>
        <!-- 迷你唱针 -->
        <div class="vinyl-mini-needle" :class="{ playing: isPlaying }"></div>
      </div>
      <!-- 歌曲名悬浮提示 -->
      <div v-if="currentSong" class="mini-song-tip">
        {{ currentSong }}
      </div>
    </div>

    <!-- 展开状态 - 随身听面板 -->
    <div v-if="isExpanded" class="vinyl-player" @click.stop>
      <!-- 黑胶唱片区域 -->
      <div class="vinyl-disco-area">
        <div class="vinyl-disc-container">
          <div class="vinyl-disc" :class="{ playing: isPlaying }">
            <div class="vinyl-label">
              <span class="vinyl-label-text">{{ currentSong ? currentSong.charAt(0) : '♪' }}</span>
            </div>
          </div>
          <!-- 唱针 -->
          <div class="vinyl-needle" :class="{ playing: isPlaying }">
            <div class="needle-base"></div>
            <div class="needle-arm">
              <div class="needle-cartridge"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- 歌曲信息 -->
      <div class="song-info-container">
        <div class="song-title">{{ currentSong || '等待播放...' }}</div>
        <div class="song-artist">{{ currentSinger || '未知艺术家' }}</div>
      </div>

      <!-- 歌词显示 -->
      <div v-if="currentLine" class="lyrics-display">
        <div class="lyric-line lyric-current">{{ currentLine }}</div>
        <div class="lyric-line lyric-next">{{ nextLine }}</div>
      </div>

      <!-- 进度条 -->
      <div class="progress-container">
        <input
          type="range"
          class="progress-bar"
          :value="currentTime"
          min="0"
          :max="duration"
          :style="{ '--progress-fill': progressPercent + '%' }"
          @input="onProgressChange"
          @click.stop
        />
        <div class="progress-time">
          <span>{{ formatTime(currentTime) }}</span>
          <span>{{ formatTime(duration) }}</span>
        </div>
      </div>

      <!-- 控制按钮 -->
      <div class="player-controls">
        <div class="controls-left">
          <button title="随机播放" class="control-btn secondary-btn" :class="{ active: isShuffle }" @click="toggleShuffle">
            <i class="fas fa-random"></i>
          </button>
          <button title="上一首" class="control-btn" @click="e => controlAction(e, 'prev')">
            <i class="fas fa-step-backward"></i>
          </button>
        </div>

        <button title="播放/暂停" class="control-btn play-btn" @click="e => controlAction(e, !isPlaying ? 'play' : 'stop')">
          <i :class="['fas', isPlaying ? 'fa-pause' : 'fa-play']"></i>
        </button>

        <div class="controls-right">
          <button title="下一首" class="control-btn" @click="e => controlAction(e, 'next')">
            <i class="fas fa-step-forward"></i>
          </button>
          <button :title="playModeText" class="control-btn secondary-btn" :class="{ active: playMode !== 'off' }" @click="togglePlayMode">
            <i :class="playModeIcon"></i>
          </button>
        </div>
      </div>

      <!-- 音量控制 -->
      <div class="volume-section">
        <i class="fas fa-volume-up vol-icon"></i>
        <input
          type="range"
          v-model="volume"
          class="volume-slider"
          min="0"
          max="100"
          :style="{ '--volume-fill': volume + '%' }"
          @click.stop
        />
      </div>

      <!-- 播放列表 -->
      <div v-if="showPlaylist && sharedState.music.list.length > 0" class="playlist-container">
        <div class="playlist-header">
          <span>播放列表 ({{ sharedState.music.list.length }})</span>
          <button class="close-playlist" @click="showPlaylist = false">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div
          v-for="(item, index) in sharedState.music.list"
          :key="'song-' + index"
          class="playlist-item"
          :class="{ active: index === sharedState.music.index }"
          @click="playFromPlaylist(index)"
        >
          <div class="item-title">{{ item.song }}</div>
          <div class="item-artist">{{ item.singer }}</div>
        </div>
      </div>

      <!-- 列表按钮 -->
      <div v-if="!showPlaylist" class="playlist-toggle">
        <button title="播放列表" class="control-btn secondary-btn" @click="showPlaylist = true">
          <i class="fas fa-list"></i>
        </button>
      </div>

      <!-- 收起按钮 -->
      <button class="collapse-btn" @click="collapsePanel" title="收起">
        <i class="fas fa-chevron-down"></i>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue';
import { sharedState } from './shared-state';
import './styles/vinyl-player.scss';

// 播放状态
const isPlaying = ref(false);
const volume = ref(65);
const currentTime = ref(0);
const duration = ref(0);
const currentLine = ref('');
const nextLine = ref('');
const currentSong = ref('');
const currentSinger = ref('');
const currentLyricStr = ref('');
const parsedLyrics = ref<{ time: number; text: string }[]>([]);
const currentLyricIndex = ref(-1);
const hasStarted = ref(false);
const playingIndex = ref(-1);

// 播放模式
const playMode = ref<'off' | 'list' | 'single'>('off');
const isShuffle = ref(false);
const showPlaylist = ref(false);
const showParticles = ref(true);

// UI状态
const isExpanded = ref(false);
const isDragging = ref(false);
const hasMovedWhileDragging = ref(false);
const isRightClick = ref(false);

// DOM引用
const widget = ref<HTMLElement | null>(null);
let startX = 0,
  startY = 0,
  initialX = 0,
  initialY = 0;
const dragX = ref(`50%`);
const dragY = ref(`20%`);
let hideTimer: any = null;

const windowWidth = ref($('body').width() || 0);
const windowHeight = ref($('body').height() || 0);
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

// 音频对象
const musicAudio = new Audio();
musicAudio.volume = volume.value / 100;

// 进度百分比
const progressPercent = computed(() => {
  if (duration.value === 0) return 0;
  return (currentTime.value / duration.value) * 100;
});

// 播放模式图标
const playModeIcon = computed(() => {
  switch (playMode.value) {
    case 'single':
      return 'fas fa-redo';
    case 'list':
      return 'fas fa-repeat';
    default:
      return 'fas fa-redo-alt';
  }
});

const playModeText = computed(() => {
  switch (playMode.value) {
    case 'single':
      return '单曲循环';
    case 'list':
      return '列表循环';
    default:
      return '关闭循环';
  }
});

// 监听 sharedState.music.index 变化
watch(
  () => sharedState.music.index,
  (newVal, oldVal) => {
    console.log('index 变化:', oldVal, '->', newVal);
    if (oldVal == -1 && newVal > -1) {
      controlAction(null, 'play');
    }
  },
);

// 监听音量
watch(volume, newVal => {
  musicAudio.volume = newVal / 100;
});

// 获取Music API
const Music = (globalThis as any).Music;

// 解析歌词
function parseLyricToTimeline(lyric: string) {
  const lines = lyric.split(/\r?\n/);
  const entries: { time: number; text: string }[] = [];

  for (const line of lines) {
    const timeTags = line.match(/\[(\d{1,2}):(\d{2})(?:\.(\d{1,3}))?\]/g);
    const text = line.replace(/\[(\d{1,2}):(\d{2})(?:\.(\d{1,3}))?\]/g, '').trim();
    if (!timeTags || !text) continue;

    for (const tag of timeTags) {
      const match = tag.match(/\[(\d{1,2}):(\d{2})(?:\.(\d{1,3}))?\]/);
      if (!match) continue;
      const minutes = Number(match[1]);
      const seconds = Number(match[2]);
      const millis = match[3] ? Number(match[3].padEnd(3, '0')) : 0;
      const time = minutes * 60 + seconds + millis / 1000;
      entries.push({ time, text });
    }
  }

  entries.sort((a, b) => a.time - b.time);
  return entries;
}

// 根据时间更新歌词显示
function updateLyricDisplayByTime(currentTime: number) {
  const list = parsedLyrics.value;
  if (!list.length) {
    currentLine.value = '';
    nextLine.value = '';
    currentLyricIndex.value = -1;
    return;
  }

  let idx = list.length - 1;
  for (let i = 0; i < list.length; i++) {
    if (currentTime < list[i].time) {
      idx = i - 1;
      break;
    }
  }

  if (idx < 0) {
    currentLine.value = '';
    nextLine.value = list[0]?.text ?? '';
    currentLyricIndex.value = -1;
    return;
  }

  if (idx !== currentLyricIndex.value) {
    currentLyricIndex.value = idx;
    currentLine.value = list[idx]?.text ?? '';
    nextLine.value = list[idx + 1]?.text ?? '';
  }
}

// 格式化时间
function formatTime(seconds: number): string {
  if (isNaN(seconds) || !isFinite(seconds)) return '00:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// 音频时间更新
function onTimeUpdate() {
  currentTime.value = musicAudio.currentTime || 0;
  updateLyricDisplayByTime(currentTime.value);
}

// 音频元数据加载完成
function onLoadedMetadata() {
  duration.value = musicAudio.duration || 0;
}

// 音频播放结束
function onEnded() {
  isPlaying.value = false;
  handlePlayEnd();
}

// 处理播放结束
function handlePlayEnd() {
  switch (playMode.value) {
    case 'single':
      // 单曲循环
      musicAudio.currentTime = 0;
      musicAudio.play();
      isPlaying.value = true;
      break;
    case 'list':
      // 列表循环
      controlAction(null, 'next');
      break;
    default:
      // 不循环
      if (sharedState.music.index < sharedState.music.list.length - 1) {
        controlAction(null, 'next');
      } else {
        isPlaying.value = false;
      }
  }
}

// 进度条变化
function onProgressChange(e: Event) {
  const target = e.target as HTMLInputElement;
  const time = parseFloat(target.value);
  musicAudio.currentTime = time;
  currentTime.value = time;
}

// 播放控制
async function controlAction(event: any, action: any) {
  event?.stopPropagation();
  startHideTimer();

  console.log('Control action:', action);

  if (action == 'stop') {
    musicAudio.pause();
    isPlaying.value = false;
    return;
  }

  let index = sharedState.music.index;
  if (index == -1) return;
  if (index > sharedState.music.list.length - 1) {
    index = sharedState.music.list.length - 1;
    sharedState.music.index = index;
  }

  if (action == 'play') {
    const canResume = hasStarted.value && playingIndex.value === index && musicAudio.src;
    if (!isPlaying.value && canResume) {
      musicAudio.play();
      isPlaying.value = true;
      return;
    }
    await PlayMusic(index);
  }

  if (action == 'prev') {
    if (isShuffle.value) {
      index = Math.floor(Math.random() * sharedState.music.list.length);
    } else if (index > 0) {
      index -= 1;
    } else {
      index = sharedState.music.list.length - 1;
    }
    sharedState.music.index = index;
    await PlayMusic(index);
  }

  if (action == 'next') {
    if (isShuffle.value) {
      let newIndex;
      do {
        newIndex = Math.floor(Math.random() * sharedState.music.list.length);
      } while (newIndex === index && sharedState.music.list.length > 1);
      index = newIndex;
    } else if (index == sharedState.music.list.length - 1) {
      index = 0;
    } else if (index < 0) {
      index = 0;
    } else {
      index += 1;
    }
    sharedState.music.index = index;
    await PlayMusic(index);
  }
}

// 播放指定歌曲
async function PlayMusic(index: number) {
  const song = sharedState.music.list[index];
  const name = song.song;
  let playUrl = '';
  const cached = sharedState.music.cache[name];
  const cachedMeta = cached && typeof cached === 'object' ? cached : null;

  if (cached) {
    const cachedUrl = typeof cached === 'string' ? cached : cached.Url;
    if (cachedUrl) {
      const available = await sharedState.music.checkAudioAvailability(cachedUrl);
      if (available) {
        playUrl = cachedUrl;
        if (cachedMeta) {
          currentSinger.value = cachedMeta.Singer;
          currentSong.value = cachedMeta.Name;
          currentLyricStr.value = cachedMeta.Lyric;
        }
      }
    }
  }

  let fetchedMeta: any = null;
  if (!playUrl) {
    currentLine.value = '搜索歌曲中';
    nextLine.value = '请稍候...';

    const result = await Music.SearchMusic(name);
    console.log(JSON.stringify(result));

    if (!result?.Url) {
      currentLine.value = '搜索失败';
      nextLine.value = '手动点击播放按钮重试';
      return;
    }
    playUrl = result.Url;
    fetchedMeta = result;
    sharedState.music.cache[name] = result;
  }

  if (playUrl != musicAudio.src) {
    musicAudio.src = playUrl;
  }

  const meta = fetchedMeta || cachedMeta;
  if (meta) {
    currentSinger.value = meta.Singer;
    currentSong.value = meta.Name;
    currentLyricStr.value = meta.Lyric;
  }

  if (currentLyricStr.value) {
    parsedLyrics.value = parseLyricToTimeline(currentLyricStr.value || '');
    currentLyricIndex.value = -1;
    updateLyricDisplayByTime(0);
  }

  try {
    await musicAudio.play();
    isPlaying.value = true;
    hasStarted.value = true;
    playingIndex.value = index;
  } catch (e) {
    console.error('播放失败:', e);
    isPlaying.value = false;
  }
}

// 从播放列表选择
function playFromPlaylist(index: number) {
  sharedState.music.index = index;
  PlayMusic(index);
  showPlaylist.value = false;
}

// 切换随机播放
function toggleShuffle() {
  isShuffle.value = !isShuffle.value;
  toastr.success(isShuffle.value ? '已开启随机播放' : '已关闭随机播放');
}

// 切换播放模式
function togglePlayMode() {
  const modes: ('off' | 'list' | 'single')[] = ['off', 'list', 'single'];
  const currentIdx = modes.indexOf(playMode.value);
  playMode.value = modes[(currentIdx + 1) % modes.length];
  const texts = { off: '关闭循环', list: '列表循环', single: '单曲循环' };
  toastr.success(texts[playMode.value]);
}

// =====================================
// 拖拽相关
// =====================================

function startHideTimer() {
  clearTimeout(hideTimer);
  if (isExpanded.value) {
    hideTimer = setTimeout(() => {
      collapsePanel();
    }, 5000);
  }
}

function startDrag(e: any) {
  const el = widget.value;
  if (!el) return;

  // 右键不处理
  if (e.button === 2 || e.which === 3) {
    isRightClick.value = true;
    return;
  }

  // 展开状态下触摸控制区不进入拖拽
  if (isMobile && e.target && e.target.closest && e.target.closest('.player-controls, .progress-container, .volume-section')) {
    if (isExpanded.value) {
      clearTimeout(hideTimer);
      startHideTimer();
    }
    return;
  }

  isRightClick.value = false;
  isDragging.value = true;
  hasMovedWhileDragging.value = false;
  el.classList.add('dragging');

  clearTimeout(hideTimer);

  const rect = el.getBoundingClientRect();
  initialX = rect.left + rect.width / 2;
  initialY = rect.top + rect.height / 2;

  if (e.type === 'mousedown') {
    startX = e.clientX;
    startY = e.clientY;
    $('body').on('mousemove', drag);
    $('body').on('mouseup', stopDrag);
  } else if (e.type === 'touchstart') {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    $('body').on('touchmove', drag);
    $('body').on('touchend', stopDrag);
  }
}

function drag(e: any) {
  if (!isDragging.value || isRightClick.value) return;
  if (e && typeof e.preventDefault === 'function') {
    e.preventDefault();
  }

  hasMovedWhileDragging.value = true;

  let clientX, clientY;
  if (e.type === 'mousemove') {
    clientX = e.clientX;
    clientY = e.clientY;
  } else if (e.type === 'touchmove') {
    clientX = e.touches[0].clientX;
    clientY = e.touches[0].clientY;
  }

  const deltaX = clientX - startX;
  const deltaY = clientY - startY;

  const newX = initialX + deltaX;
  const newY = initialY + deltaY;

  const margin = 20;
  const maxX = windowWidth.value - margin;
  const maxY = windowHeight.value - margin;

  const clampedX = Math.max(margin, Math.min(maxX, newX));
  const clampedY = Math.max(margin, Math.min(maxY, newY));

  dragX.value = `${clampedX}px`;
  dragY.value = `${clampedY}px`;

  if (isExpanded.value) {
    widget.value!.style.transform = 'translate(-50%, -50%) scale(1.01)';
  } else {
    widget.value!.style.transform = 'translate(-50%, -50%) scale(1.05)';
  }
}

function stopDrag(e: any) {
  if (!isDragging.value && !isRightClick.value) return;

  $('body').off('mousemove', drag);
  $('body').off('mouseup', stopDrag);
  $('body').off('touchmove', drag);
  $('body').off('touchend', stopDrag);

  if (isRightClick.value) {
    isRightClick.value = false;
    return;
  }

  const el = widget.value;
  const wasExpanded = isExpanded.value;

  isDragging.value = false;
  if (el) {
    el.classList.remove('dragging');
    el.style.transform = '';
  }

  if (hasMovedWhileDragging.value) {
    savePosition();
    if (wasExpanded) {
      setTimeout(() => startHideTimer(), 100);
    }
  }

  hasMovedWhileDragging.value = false;
}

function handleDoubleClick(e: any) {
  if (isDragging.value || hasMovedWhileDragging.value || isRightClick.value) return;
  if (isExpanded.value) {
    collapsePanel();
  } else {
    expandPanel();
  }
}

function expandPanel() {
  isExpanded.value = true;
  startHideTimer();
}

function collapsePanel() {
  isExpanded.value = false;
  clearTimeout(hideTimer);
}

function savePosition() {
  const el = widget.value;
  if (!el) return;
  const rect = el.getBoundingClientRect();
  const position = {
    x: ((rect.left + rect.width / 2) / windowWidth.value) * 100,
    y: ((rect.top + rect.height / 2) / windowHeight.value) * 100,
  };
  console.log(`保存坐标位置:\n${JSON.stringify(position)}`);
  localStorage.setItem('vinylWidgetPosition', JSON.stringify(position));
}

function restorePosition() {
  const el = widget.value;
  if (!el) return;
  const saved = localStorage.getItem('vinylWidgetPosition');
  console.log(`读取到的坐标位置:${saved}`);
  if (saved) {
    try {
      const position = JSON.parse(saved);
      let x = 50;
      if (position.x < 100 && position.x > 0) x = position.x;
      let y = 20;
      if (position.y < 100 && position.y > 0) y = position.y;
      el.style.left = x + '%';
      el.style.top = y + '%';
    } catch (e) {
      console.error('解析位置失败:', e);
    }
  }
}

function onContextMenu(e: any) {
  isRightClick.value = true;
  if (isDragging.value) {
    isDragging.value = false;
    if (widget.value) {
      widget.value.classList.remove('dragging');
      widget.value.style.transform = '';
    }
  }
}

function onMouseEnter() {
  if (isMobile) return;
  clearTimeout(hideTimer);
}

function onMouseLeave() {
  if (isMobile) return;
  if (isExpanded.value && !isDragging.value) {
    hideTimer = setTimeout(() => {
      collapsePanel();
    }, 3000);
  }
}

function onResize() {
  windowWidth.value = $('body').width() || 0;
  windowHeight.value = $('body').height() || 0;
  const el = widget.value;
  if (!el) return;
  const rect = el.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const margin = 50;
  const maxX = windowWidth.value - margin;
  const maxY = windowHeight.value - margin;

  const newX = Math.max(margin, Math.min(maxX, centerX));
  const newY = Math.max(margin, Math.min(maxY, centerY));

  el.style.left = (newX / windowWidth.value) * 100 + '%';
  el.style.top = (newY / windowHeight.value) * 100 + '%';

  savePosition();
}

function onVisibilityChange() {
  if (document.hidden) {
    clearTimeout(hideTimer);
  } else if (isExpanded.value) {
    startHideTimer();
  }
}

function onDocumentClick(e: any) {
  if (isRightClick.value) {
    isRightClick.value = false;
  }
}

function onKeyDown(e: any) {
  if (e.key === 'Escape') {
    isRightClick.value = false;
    if (isExpanded.value) collapsePanel();
  }
}

// =====================================
// 生命周期
// =====================================

onMounted(() => {
  // 触摸移动阻止默认行为
  if (widget.value) {
    widget.value.addEventListener(
      'touchmove',
      (e: TouchEvent) => {
        if (isDragging.value && !isRightClick.value) {
          e.preventDefault();
        }
      },
      { passive: false } as AddEventListenerOptions,
    );
  }

  $('body').on('visibilitychange', onVisibilityChange);
  $('body').on('click', onDocumentClick);
  $('body').on('keydown', onKeyDown);
  window.addEventListener('resize', onResize);

  restorePosition();

  // 绑定音频事件
  musicAudio.addEventListener('timeupdate', onTimeUpdate);
  musicAudio.addEventListener('loadedmetadata', onLoadedMetadata);
  musicAudio.addEventListener('ended', onEnded);
});

onBeforeUnmount(() => {
  clearTimeout(hideTimer);
  $('body').off('mousemove', drag);
  $('body').off('mouseup', stopDrag);
  $('body').off('touchmove', drag);
  $('body').off('touchend', stopDrag);
  $('body').off('visibilitychange', onVisibilityChange);
  $('body').off('click', onDocumentClick);
  $('body').off('keydown', onKeyDown);
  window.removeEventListener('resize', onResize);

  musicAudio.removeEventListener('timeupdate', onTimeUpdate);
  musicAudio.removeEventListener('loadedmetadata', onLoadedMetadata);
  musicAudio.removeEventListener('ended', onEnded);
});
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');

.vinyl-widget {
  position: fixed;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999999;
  user-select: none;
  cursor: pointer;
}

.vinyl-widget.dragging {
  cursor: grabbing;
}

/* ===================================== */
/* 悬浮球 - 黑胶唱片迷你版 */
/* ===================================== */

.vinyl-mini {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.vinyl-mini-disc {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%);
  position: relative;
  box-shadow:
    0 4px 15px rgba(0, 0, 0, 0.4),
    inset 0 0 20px rgba(0, 0, 0, 0.5);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  /* 唱片纹理 */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 50%;
    background: repeating-radial-gradient(
      circle at center,
      transparent 0px,
      transparent 2px,
      rgba(60, 60, 60, 0.4) 2px,
      rgba(60, 60, 60, 0.4) 3px,
      transparent 3px,
      transparent 5px
    );
  }

  /* 高光 */
  &::after {
    content: '';
    position: absolute;
    top: 8%;
    left: 20%;
    width: 25%;
    height: 15%;
    border-radius: 50%;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.2),
      transparent
    );
  }
}

.vinyl-mini-disc.playing {
  animation: vinyl-rotate 3s linear infinite;
}

.vinyl-mini-label {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ec4141, #c0392b);
  box-shadow:
    inset 0 2px 4px rgba(255, 255, 255, 0.3),
    0 2px 4px rgba(0, 0, 0, 0.3);

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #1a1a1a;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
}

.vinyl-mini-needle {
  position: absolute;
  top: -5px;
  right: 5px;
  width: 3px;
  height: 20px;
  background: linear-gradient(90deg, #888, #bbb, #888);
  border-radius: 2px;
  transform: rotate(-25deg);
  transform-origin: bottom center;
  transition: transform 0.3s ease;
  opacity: 0;

  &.playing {
    opacity: 1;
    animation: needle-wobble 0.5s ease-out;
  }
}

@keyframes needle-wobble {
  0% {
    transform: rotate(-45deg);
  }
  50% {
    transform: rotate(-20deg);
  }
  100% {
    transform: rotate(-25deg);
  }
}

.mini-song-tip {
  font-size: 11px;
  color: #666;
  max-width: 80px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: center;
  background: rgba(255, 255, 255, 0.9);
  padding: 2px 8px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* ===================================== */
/* 展开后的随身听面板 */
/* ===================================== */

.vinyl-player {
  width: 320px;
  background: #ffffff;
  border-radius: 24px;
  padding: 24px;
  box-shadow:
    0 20px 60px rgba(0, 0, 0, 0.15),
    0 8px 25px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
}

/* ===================================== */
/* 黑胶唱片区域 */
/* ===================================== */

.vinyl-disco-area {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  position: relative;
}

.vinyl-disc-container {
  position: relative;
  width: 180px;
  height: 180px;
}

.vinyl-disc {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 30%, #1a1a1a 60%, #333 100%);
  position: relative;
  box-shadow:
    0 8px 30px rgba(0, 0, 0, 0.4),
    inset 0 0 40px rgba(0, 0, 0, 0.6);

  /* 唱片纹理 */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 50%;
    background: repeating-radial-gradient(
      circle at center,
      transparent 0px,
      transparent 3px,
      rgba(80, 80, 80, 0.3) 3px,
      rgba(80, 80, 80, 0.3) 4px,
      transparent 4px,
      transparent 7px
    );
  }

  /* 高光 */
  &::after {
    content: '';
    position: absolute;
    top: 5%;
    left: 15%;
    width: 30%;
    height: 20%;
    border-radius: 50%;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.15),
      transparent
    );
  }
}

.vinyl-disc.playing {
  animation: vinyl-rotate 3s linear infinite;
}

.vinyl-label {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ec4141, #c0392b);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow:
    inset 0 3px 6px rgba(255, 255, 255, 0.3),
    0 4px 10px rgba(0, 0, 0, 0.3);
  z-index: 2;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #1a1a1a;
    border: 2px solid rgba(255, 255, 255, 0.2);
  }
}

.vinyl-label-text {
  font-size: 24px;
  color: rgba(255, 255, 255, 0.9);
  font-weight: bold;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  z-index: 1;
}

/* ===================================== */
/* 唱针 */
/* ===================================== */

.vinyl-needle {
  position: absolute;
  top: -10px;
  right: 10px;
  width: 6px;
  height: 80px;
  transform-origin: top center;
  transform: rotate(-35deg);
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 10;
  pointer-events: none;
}

.vinyl-needle.playing {
  transform: rotate(0deg);
}

.needle-base {
  position: absolute;
  top: -5px;
  left: 50%;
  transform: translateX(-50%);
  width: 14px;
  height: 14px;
  background: linear-gradient(135deg, #999, #666);
  border-radius: 50%;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
}

.needle-arm {
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #888, #ccc, #888);
  border-radius: 3px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.3);
  position: relative;
}

.needle-cartridge {
  position: absolute;
  bottom: -6px;
  left: 50%;
  transform: translateX(-50%);
  width: 8px;
  height: 12px;
  background: #444;
  border-radius: 0 0 3px 3px;

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 1px;
    height: 5px;
    background: #222;
  }
}

/* ===================================== */
/* 歌曲信息 */
/* ===================================== */

.song-info-container {
  text-align: center;
  margin-bottom: 12px;
}

.song-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.song-artist {
  font-size: 14px;
  color: #888;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* ===================================== */
/* 歌词显示 */
/* ===================================== */

.lyrics-display {
  text-align: center;
  min-height: 48px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
  margin-bottom: 12px;
}

.lyric-line {
  font-size: 14px;
  color: #666;
  transition: all 0.3s ease;
  line-height: 1.4;
}

.lyric-current {
  color: #333;
  font-weight: 500;
  font-size: 15px;
}

.lyric-next {
  opacity: 0.6;
  font-size: 13px;
}

/* ===================================== */
/* 进度条 - 强制重置样式防止全局污染 */
/* ===================================== */

.progress-container {
  margin: 8px 0;
}

.progress-bar {
  -webkit-appearance: none !important;
  appearance: none !important;
  background: transparent !important;
  filter: none !important;
  border-radius: 0 !important;
  border: none !important;
  outline: none !important;
  width: 100% !important;
  height: 20px !important;
  cursor: pointer;
  margin: 0 !important;
  padding: 0 !important;
  box-shadow: none !important;
}

.progress-bar::-webkit-slider-runnable-track {
  width: 100% !important;
  height: 4px !important;
  border-radius: 2px !important;
  border: none !important;
  background: linear-gradient(
    90deg,
    #ec4141 0%,
    #ec4141 var(--progress-fill, 0%),
    #e0e0e0 var(--progress-fill, 0%),
    #e0e0e0 100%
  ) !important;
}

.progress-bar::-webkit-slider-thumb {
  -webkit-appearance: none !important;
  appearance: none !important;
  width: 12px !important;
  height: 12px !important;
  border-radius: 50% !important;
  background: #ec4141 !important;
  cursor: pointer;
  margin-top: -4px !important;
  border: none !important;
  box-shadow: 0 2px 6px rgba(236, 65, 65, 0.4) !important;
  transition: transform 0.15s ease;
}

.progress-bar:hover::-webkit-slider-thumb {
  transform: scale(1.3);
}

.progress-bar::-moz-range-track {
  width: 100% !important;
  height: 4px !important;
  border-radius: 2px !important;
  border: none !important;
  background: #e0e0e0 !important;
}

.progress-bar::-moz-range-progress {
  height: 4px !important;
  border-radius: 2px !important;
  background: #ec4141 !important;
}

.progress-bar::-moz-range-thumb {
  width: 12px !important;
  height: 12px !important;
  border-radius: 50% !important;
  background: #ec4141 !important;
  cursor: pointer;
  border: none !important;
  box-shadow: 0 2px 6px rgba(236, 65, 65, 0.4) !important;
}

.progress-time {
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  color: #999;
  margin-top: 4px;
}

/* ===================================== */
/* 控制按钮 */
/* ===================================== */

.player-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-top: 12px;
}

.controls-left,
.controls-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.control-btn {
  background: none;
  border: none;
  color: #888;
  font-size: 18px;
  cursor: pointer;
  padding: 10px;
  border-radius: 50%;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #333;
    background: rgba(0, 0, 0, 0.05);
  }

  &.active {
    color: #ec4141;
  }

  &.play-btn {
    width: 56px;
    height: 56px;
    background: linear-gradient(135deg, #ec4141, #c0392b);
    color: white;
    font-size: 22px;
    box-shadow: 0 6px 20px rgba(236, 65, 65, 0.4);

    &:hover {
      transform: scale(1.08);
      box-shadow: 0 8px 25px rgba(236, 65, 65, 0.5);
    }
  }

  &.secondary-btn {
    font-size: 14px;
  }
}

/* ===================================== */
/* 音量控制 */
/* ===================================== */

.volume-section {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
  padding: 0 10px;
}

.vol-icon {
  font-size: 14px;
  color: #888;
}

.volume-slider {
  -webkit-appearance: none !important;
  appearance: none !important;
  background: transparent !important;
  filter: none !important;
  border-radius: 0 !important;
  border: none !important;
  outline: none !important;
  flex: 1;
  height: 20px !important;
  cursor: pointer;
  margin: 0 !important;
  padding: 0 !important;
  box-shadow: none !important;
}

.volume-slider::-webkit-slider-runnable-track {
  width: 100% !important;
  height: 3px !important;
  border-radius: 1.5px !important;
  border: none !important;
  background: linear-gradient(
    90deg,
    #888 0%,
    #888 var(--volume-fill, 50%),
    #e0e0e0 var(--volume-fill, 50%),
    #e0e0e0 100%
  ) !important;
}

.volume-slider::-webkit-slider-thumb {
  -webkit-appearance: none !important;
  appearance: none !important;
  width: 10px !important;
  height: 10px !important;
  border-radius: 50% !important;
  background: #666 !important;
  cursor: pointer;
  margin-top: -3.5px !important;
  border: none !important;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2) !important;
}

.volume-slider::-moz-range-track {
  width: 100% !important;
  height: 3px !important;
  border-radius: 1.5px !important;
  border: none !important;
  background: #e0e0e0 !important;
}

.volume-slider::-moz-range-thumb {
  width: 10px !important;
  height: 10px !important;
  border-radius: 50% !important;
  background: #666 !important;
  cursor: pointer;
  border: none !important;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2) !important;
}

/* ===================================== */
/* 播放列表 */
/* ===================================== */

.playlist-container {
  margin-top: 16px;
  max-height: 180px;
  overflow-y: auto;
  border-top: 1px solid #f0f0f0;
  padding-top: 12px;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 2px;
  }
}

.playlist-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  color: #666;
  margin-bottom: 8px;
  font-weight: 500;
}

.close-playlist {
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  padding: 4px 8px;
  font-size: 12px;

  &:hover {
    color: #666;
  }
}

.playlist-item {
  padding: 8px 10px;
  cursor: pointer;
  border-radius: 8px;
  transition: background 0.2s ease;
  margin-bottom: 4px;

  &:hover {
    background: rgba(0, 0, 0, 0.04);
  }

  &.active {
    background: rgba(236, 65, 65, 0.1);

    .item-title {
      color: #ec4141;
    }
  }
}

.item-title {
  font-size: 14px;
  color: #333;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.item-artist {
  font-size: 12px;
  color: #999;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-top: 2px;
}

.playlist-toggle {
  display: flex;
  justify-content: center;
  margin-top: 12px;
}

/* ===================================== */
/* 收起按钮 */
/* ===================================== */

.collapse-btn {
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  background: none;
  border: none;
  color: #ccc;
  cursor: pointer;
  padding: 6px;
  font-size: 14px;
  transition: color 0.2s ease;

  &:hover {
    color: #999;
  }
}

/* ===================================== */
/* 动态背景效果 */
/* ===================================== */

.background-effects {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
}

.particle {
  position: absolute;
  border-radius: 50%;
  animation: float-up 5s linear infinite;
}

.particle.snow {
  width: 4px;
  height: 4px;
  background: rgba(255, 255, 255, 0.7);
  left: 20%;
  animation-duration: 4s;
}

.particle.bubble {
  width: 6px;
  height: 6px;
  background: rgba(236, 65, 65, 0.2);
  right: 20%;
  animation-duration: 6s;
}

@keyframes float-up {
  0% {
    transform: translateY(100%) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 0.6;
  }
  90% {
    opacity: 0.6;
  }
  100% {
    transform: translateY(-300px) rotate(360deg);
    opacity: 0;
  }
}

/* ===================================== */
/* 动画关键帧 */
/* ===================================== */

@keyframes vinyl-rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* ===================================== */
/* 响应式设计 */
/* ===================================== */

@media (max-width: 480px) {
  .vinyl-player {
    width: 280px;
    padding: 20px;
    border-radius: 20px;
  }

  .vinyl-disc-container {
    width: 150px;
    height: 150px;
  }

  .vinyl-label {
    width: 50px;
    height: 50px;
  }

  .vinyl-label-text {
    font-size: 20px;
  }

  .vinyl-needle {
    height: 65px;
  }

  .song-title {
    font-size: 16px !important;
  }

  .song-artist {
    font-size: 13px !important;
  }

  .player-controls {
    gap: 10px;

    .control-btn.play-btn {
      width: 48px;
      height: 48px;
      font-size: 18px;
    }

    .control-btn {
      font-size: 16px;
      padding: 8px;
    }
  }

  .playlist-container {
    max-height: 140px;
  }
}

@media (max-width: 360px) {
  .vinyl-player {
    width: 260px;
    padding: 16px;
  }

  .vinyl-disc-container {
    width: 130px;
    height: 130px;
  }
}

/* ===================================== */
/* 深色模式适配 */
/* ===================================== */

@media (prefers-color-scheme: dark) {
  .vinyl-player {
    background: #2a2a2a;
    box-shadow:
      0 20px 60px rgba(0, 0, 0, 0.4),
      0 8px 25px rgba(0, 0, 0, 0.3);
  }

  .song-title {
    color: #fff;
  }

  .song-artist {
    color: #aaa;
  }

  .lyric-line {
    color: #aaa;
  }

  .lyric-current {
    color: #fff;
  }

  .progress-bar::-webkit-slider-runnable-track {
    background: linear-gradient(
      90deg,
      #ec4141 0%,
      #ec4141 var(--progress-fill, 0%),
      #444 var(--progress-fill, 0%),
      #444 100%
    ) !important;
  }

  .progress-bar::-moz-range-track {
    background: #444 !important;
  }

  .progress-time {
    color: #888;
  }

  .control-btn {
    color: #888;

    &:hover {
      color: #fff;
      background: rgba(255, 255, 255, 0.1);
    }
  }

  .playlist-container {
    border-top-color: #333;

    .playlist-item {
      &:hover {
        background: rgba(255, 255, 255, 0.05);
      }

      .item-title {
        color: #eee;
      }

      .item-artist {
        color: #888;
      }
    }
  }

  .mini-song-tip {
    background: rgba(42, 42, 42, 0.95);
    color: #ccc;
  }
}
</style>
