'use client'

import { useEffect, useState } from 'react'
import {
  IconArrow,
  IconCircle,
  IconDownload,
  IconGauge,
  IconGrid,
  IconLong,
  IconMoon,
  IconShield,
  IconSparkles,
  IconSquare,
  IconSun,
  IconText,
} from '@/components/Icons'
import Logo from '@/components/Logo'
import { SITE_URL, absUrl } from '@/lib/site'

const FEATURES = [
  {
    icon: <IconGrid className="h-5 w-5" />,
    title: '海量布局模板',
    desc: '1~30 张图片智能布局，250+ 种专业模板一键套用，拖动分割线还能自由调整格子大小。',
  },
  {
    icon: <IconLong className="h-5 w-5" />,
    title: '长图拼接',
    desc: '聊天记录、网页截图一键拼成长图，支持横竖双向，拖拽即可调整拼接顺序。',
  },
  {
    icon: <IconText className="h-5 w-5" />,
    title: '自由标注',
    desc: '文字、箭头、方框、圆圈随意添加，拖动即移动，手柄缩放，双击改字，颜色粗细随手调。',
  },
  {
    icon: <IconGauge className="h-5 w-5" />,
    title: '精细样式控制',
    desc: '画布比例、间距、圆角、边距、背景纯色渐变、图片描边与阴影，全部实时预览。',
  },
  {
    icon: <IconDownload className="h-5 w-5" />,
    title: '高清无水印导出',
    desc: 'PNG / JPG / WebP 任选，支持 1x~3x 与 4K 超清导出，画质与体积自由平衡。',
  },
  {
    icon: <IconShield className="h-5 w-5" />,
    title: '绝对隐私',
    desc: '全部处理在你自己的浏览器里完成，图片从不上传服务器，不存储、不留痕。',
  },
]

const STEPS = [
  { n: '1', title: '选择布局', desc: '从几十种模板中挑选，或上传多张图片让系统自动匹配合适布局。' },
  { n: '2', title: '上传调整', desc: '拖拽上传与交换，滚轮缩放图片，Alt 拖动精细构图，还能加标注。' },
  { n: '3', title: '导出保存', desc: '调整样式参数，选择格式、分辨率与画质，一键下载高清拼图。' },
]

const SCENES = [
  { title: '社交媒体', desc: '小红书封面、朋友圈九宫格、Instagram 故事，让内容更吸睛。' },
  { title: '电商与作品集', desc: '商品多角度对比图、设计作品集排版，专业效果一步到位。' },
  { title: '生活记录', desc: '旅行合辑、成长记录、宠物日常，把美好瞬间拼成一幅画。' },
  { title: '教育培训', desc: '步骤分解、错题整理、课件配图，清晰直观便于讲解。' },
]

const FAQS = [
  {
    q: '我的图片会被上传到服务器吗？',
    a: '不会。所有图片处理都在你的浏览器本地完成，图片不会离开你的设备，我们也不存储任何图片数据。',
  },
  {
    q: '支持哪些图片格式？',
    a: '上传支持 JPG、PNG、WebP、GIF 等常见格式；导出支持 PNG、JPG、WebP，其中 PNG 与 WebP 支持透明背景（导出面板勾选「透明背景」即可）。',
  },
  {
    q: '最多可以拼多少张图？',
    a: '布局模式最多支持 30 张图片，提供数百种模板；长图拼接模式不限制拼接数量，可以拼出超长图。',
  },
  {
    q: '导出的图片清晰吗？',
    a: '支持 1x、2x、3x 以及 4K 超清导出，最高可达 3840px 长边，无水印，满足打印与商用需求。',
  },
  {
    q: '手机上可以用吗？',
    a: '可以。编辑器针对手机与平板做了适配，上传、拖拽排序、样式调整、导出在小屏上同样顺滑。',
  },
  {
    q: '真的完全免费吗？',
    a: '是的。无需注册登录，无使用次数限制，所有功能永久免费，也没有隐藏付费。',
  },
]

function ThemeToggle() {
  const [dark, setDark] = useState(false)
  useEffect(() => setDark(document.documentElement.classList.contains('dark')), [])
  const toggle = () => {
    const next = !document.documentElement.classList.contains('dark')
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('dypintu-theme', next ? 'dark' : 'light')
    setDark(next)
  }
  return (
    <button
      onClick={toggle}
      className="grid h-10 w-10 place-items-center rounded-full border border-paper-line text-warm-graphite transition-colors hover:bg-paper-soft active:bg-paper-deep"
      aria-label="切换主题"
    >
      {dark ? <IconSun className="h-4 w-4" /> : <IconMoon className="h-4 w-4" />}
    </button>
  )
}

/** 作品画面：紫/橙两色只出现在拼图作品里，不作为界面色使用（DESIGN.md） */
const COLLAGE_TILES = [
  {
    span: 'col-span-2 row-span-2',
    grad: 'radial-gradient(120% 100% at 25% 20%, #8f7bff 0%, #0447ff 55%, #241a63 100%)',
  },
  {
    span: 'col-span-2',
    grad: 'radial-gradient(120% 120% at 20% 20%, #ffb199 0%, #ff4704 60%, #7a1f08 100%)',
  },
  {
    span: '',
    grad: 'radial-gradient(100% 100% at 30% 30%, #fdfcfc 0%, #ebe8e4 60%, #c9c3bb 100%)',
  },
  {
    span: '',
    grad: 'radial-gradient(100% 100% at 70% 30%, #ffd0c2 0%, #ff8a60 55%, #ff4704 100%)',
  },
  {
    span: '',
    grad: 'radial-gradient(100% 100% at 30% 70%, #c9c0ff 0%, #6b8cff 55%, #0447ff 100%)',
  },
  {
    span: 'col-span-2 row-span-2',
    grad: 'radial-gradient(120% 120% at 75% 25%, #ffc4a8 0%, #ff7a4d 40%, #ff4704 65%, #6b2a12 100%)',
  },
  {
    span: '',
    grad: 'radial-gradient(100% 100% at 25% 25%, #f5f3f1 0%, #d8d2c9 70%, #a59f97 100%)',
  },
  {
    span: 'col-start-4 row-start-4',
    grad: 'radial-gradient(100% 100% at 75% 75%, #9d8cff 0%, #5a52d6 55%, #2c2091 100%)',
  },
]

const ANNOTATIONS = [
  { icon: <IconText className="h-4 w-4" />, label: '文字' },
  { icon: <IconArrow className="h-4 w-4" />, label: '箭头' },
  { icon: <IconSquare className="h-4 w-4" />, label: '方框' },
  { icon: <IconCircle className="h-4 w-4" />, label: '圆圈' },
]

/** 大画布预览：暖灰大卡 + 蛋壳白拼图面板，右侧列出标注工具 */
function HeroPreview() {
  return (
    <div className="rounded-[24px] bg-paper-soft p-5 sm:p-8 lg:p-12">
      <div className="grid items-center gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="rounded-[20px] bg-paper p-3 sm:p-4">
            <div className="grid aspect-[4/3] grid-cols-4 grid-rows-4 gap-2 overflow-hidden rounded-[12px]">
              {COLLAGE_TILES.map((t, i) => (
                <div
                  key={i}
                  className={`${t.span} rounded-[10px]`}
                  style={{ backgroundImage: t.grad }}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="lg:col-span-5">
          <p className="text-[10px] font-medium tracking-[0.18em] text-warm-ash">标注工具</p>
          <ul className="mt-4 border-y border-paper-line">
            {ANNOTATIONS.map((a) => (
              <li
                key={a.label}
                className="flex items-center justify-between border-b border-paper-line py-3 text-[14px] font-medium tracking-[0.01em] text-warm-graphite last:border-b-0"
              >
                <span>{a.label}</span>
                <span className="grid h-8 w-8 place-items-center rounded-full bg-paper-deep text-warm-ink">
                  {a.icon}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs leading-[1.6] tracking-[0.01em] text-warm-smoke">
            拖动即移动，手柄缩放，双击改字，颜色粗细随手调。
          </p>
        </div>
      </div>
    </div>
  )
}

/** 首页结构化数据：WebPage + FAQPage（FAQ 助力搜索结果富摘要） */
const HOME_JSONLD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': absUrl('/#webpage'),
      url: SITE_URL + '/',
      name: '免费在线拼图工具 - 自由布局与长图拼接 - 多元拼图',
      description:
        '多元拼图是一款免费在线拼图工具，支持 1~30 张网格布局与横竖长图拼接，可调间距、圆角、背景与标注，4K 高清无水印导出，图片不上传服务器。',
      inLanguage: 'zh-CN',
      isPartOf: { '@id': absUrl('/#website') },
      about: { '@id': absUrl('/#app') },
      primaryImageOfPage: { '@type': 'ImageObject', url: absUrl('/og-image.png') },
    },
    {
      '@type': 'FAQPage',
      '@id': absUrl('/#faq'),
      isPartOf: { '@id': absUrl('/#webpage') },
      mainEntity: FAQS.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ],
}

/* 营销面按钮：DESIGN.md 的 Filled / Outline Pill，9999px 药丸，14px/500，1px 描边 */
const PILL_PRIMARY =
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border border-[#e5e5e5] bg-ink-button text-sm font-medium text-on-ink-button transition duration-200 ease-out hover:shadow-[0_1px_2px_rgba(0,0,0,0.08)] active:opacity-90 dark:border-[#3a352f]'
const PILL_SECONDARY =
  'inline-flex items-center justify-center whitespace-nowrap rounded-full border border-[#e5e5e5] bg-paper text-sm font-medium text-warm-ink transition duration-200 ease-out hover:bg-paper-soft active:bg-paper-deep dark:border-[#3a352f]'

/* 可见内容宽上限 1280px，内边距放在 1280 之外：
   lg 处外框 = 1280 + 64×2 = 1408，sm = 1280 + 40×2，base = 1280 + 24×2 */
const CONTAINER =
  'mx-auto w-full max-w-[1328px] px-6 sm:max-w-[1360px] sm:px-10 lg:max-w-[1408px] lg:px-16'
const H2 =
  'text-[28px] font-medium leading-[1.17] tracking-[-0.02em] text-warm-ink sm:text-[32px] lg:text-[36px]'

/** 章节小标签：编号 + 细分隔线 + 名称，取自 DESIGN.md 的 caption 层级 */
function Eyebrow({ no, label }: { no: string; label: string }) {
  return (
    <p className="flex items-center gap-3 text-[10px] font-medium tracking-[0.18em] text-warm-ash">
      <span>{no}</span>
      <span className="h-px w-6 bg-paper-line" />
      <span>{label}</span>
    </p>
  )
}

export default function Home() {
  return (
    <div className="min-h-screen bg-paper tracking-[0.01em] text-warm-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(HOME_JSONLD) }}
      />
      {/* 极简顶栏：蛋壳白 + 暖灰发丝线，不吸顶（DESIGN.md 的导航规范） */}
      <header className="border-b border-paper-line">
        <div className={`${CONTAINER} flex h-20 items-center gap-3`}>
          <a href="/" className="flex shrink-0 items-center gap-2.5">
            <Logo className="h-7 w-7 shrink-0" />
            <span className="text-[15px] font-medium tracking-[-0.01em] text-warm-ink">
              多元拼图
            </span>
          </a>
          <nav className="ml-10 hidden items-center gap-8 text-sm font-medium text-warm-smoke lg:flex">
            <a href="#features" className="transition-colors hover:text-warm-ink">功能</a>
            <a href="#steps" className="transition-colors hover:text-warm-ink">使用步骤</a>
            <a href="#scenes" className="transition-colors hover:text-warm-ink">应用场景</a>
            <a href="#faq" className="transition-colors hover:text-warm-ink">常见问题</a>
          </nav>
          <div className="ml-auto flex items-center gap-2 sm:gap-3">
            <ThemeToggle />
            <a href="/editor/" className={`${PILL_PRIMARY} h-10 px-5`}>
              免费创作
            </a>
          </div>
        </div>
      </header>

      {/* Hero：不对称版式，标题居左、说明右对齐贴底，药丸按钮在标题下方 */}
      <section className={`${CONTAINER} pt-14 pb-10 sm:pt-20 sm:pb-12`}>
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-7">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-paper-line px-3.5 py-1.5 text-xs font-medium tracking-[0.01em] text-warm-graphite">
              <IconShield className="h-3.5 w-3.5" />
              纯本地处理 · 无需登录 · 无水印
            </span>
            <h1 className="mt-6 text-[34px] font-medium leading-[1.1] tracking-[-0.02em] text-warm-ink sm:text-[40px] lg:text-[48px]">
              免费在线拼图
              <br />
              与长图拼接工具
            </h1>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="/editor/" className={`${PILL_PRIMARY} px-5 py-3.5`}>
                <IconSparkles className="h-4 w-4" />
                立即免费创作
              </a>
              <a href="#features" className={`${PILL_SECONDARY} px-5 py-3.5`}>
                看看能做什么
              </a>
            </div>
            <p className="mt-4 text-xs tracking-[0.01em] text-warm-ash">
              打开即用，用完即走，不留任何痕迹
            </p>
          </div>
          <div className="lg:col-span-5 lg:flex lg:items-end lg:justify-end">
            <p className="max-w-[38ch] text-[16px] leading-[1.6] tracking-[0.01em] text-warm-smoke lg:text-right">
              布局拼图、长图拼接、画布标注三合一。几十种模板、拖拽即换、
              滚轮缩放，还能自由添加文字、箭头、方框与圆圈，全部在浏览器本地完成，4K 高清导出不打折。
            </p>
          </div>
        </div>
      </section>

      {/* 作品预览：大卡占满内容宽度（DESIGN.md 的 Large Feature Card） */}
      <section className={CONTAINER}>
        <HeroPreview />
      </section>

      {/* Features：暖灰大卡内的双列清单，发丝线分隔，不用卡片网格 */}
      <section id="features" className={`${CONTAINER} scroll-mt-24 py-12 sm:py-16`}>
        <div className="rounded-[24px] bg-paper-soft p-6 sm:p-10 lg:p-12">
          <div className="grid items-end gap-6 border-b border-paper-line pb-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Eyebrow no="01" label="功能" />
              <h2 className={`mt-4 ${H2}`}>超越传统拼图的全能画布</h2>
            </div>
            <p className="text-[15px] leading-[1.6] tracking-[0.01em] text-warm-smoke lg:col-span-5 lg:text-right">
              不只是把图片摆在一起 —— 布局、长图、标注、样式、导出，一条链路全部搞定。
            </p>
          </div>
          <div className="grid sm:grid-cols-2 sm:gap-x-12">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="flex gap-4 border-b border-paper-line py-6 last:border-b-0 sm:[&:nth-last-child(-n+2)]:border-b-0"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-paper-deep text-warm-graphite">
                  {f.icon}
                </span>
                <div>
                  <h3 className="text-[18px] font-medium leading-[1.44] tracking-[-0.01em] text-warm-ink">
                    {f.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-[1.6] tracking-[0.01em] text-warm-smoke">
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps：暖灰通栏，编号直接当版式元素 */}
      <section id="steps" className="scroll-mt-24 border-y border-paper-line bg-paper-soft">
        <div className={`${CONTAINER} py-12 sm:py-16`}>
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Eyebrow no="02" label="使用步骤" />
              <h2 className={`mt-4 ${H2}`}>三步做出一张好拼图</h2>
            </div>
            <div className="grid gap-8 sm:grid-cols-3 lg:col-span-8">
              {STEPS.map((s) => (
                <div
                  key={s.n}
                  className="border-t border-paper-line pt-5 sm:border-t-0 sm:border-l sm:pl-8 sm:first:border-l-0 sm:first:pl-0"
                >
                  <span className="block text-[32px] font-light leading-none tracking-[-0.02em] text-warm-ash">
                    {s.n}
                  </span>
                  <h3 className="mt-4 text-[18px] font-medium leading-[1.44] tracking-[-0.01em] text-warm-ink">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-[1.6] tracking-[0.01em] text-warm-smoke">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Scenes：纯发丝线清单，弱化卡片感 */}
      <section id="scenes" className={`${CONTAINER} scroll-mt-24 py-12 sm:py-16`}>
        <div className="grid items-end gap-6 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow no="03" label="应用场景" />
            <h2 className={`mt-4 ${H2}`}>这些场景，它都能搞定</h2>
          </div>
        </div>
        <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {SCENES.map((s) => (
            <div key={s.title} className="border-t border-paper-line pt-5">
              <h3 className="text-[18px] font-medium leading-[1.44] tracking-[-0.01em] text-warm-ink">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-[1.6] tracking-[0.01em] text-warm-smoke">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Privacy：暖灰大卡，标题居左、行动按钮贴底右对齐 */}
      <section className={`${CONTAINER} py-12 sm:py-16`}>
        <div className="rounded-[24px] bg-paper-soft p-8 sm:p-12 lg:p-16">
          <div className="grid items-end gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-paper-deep text-warm-ink">
                <IconShield className="h-5 w-5" />
              </span>
              <h2 className={`mt-6 ${H2}`}>你的照片，从未离开你的设备</h2>
              <p className="mt-4 max-w-2xl text-[16px] leading-[1.6] tracking-[0.01em] text-warm-smoke">
                我们不做上传，不做存储，也没有账号体系。所有拼接、渲染、导出都在你的浏览器里完成，
                关掉页面，一切归零。把隐私交还给你自己。
              </p>
            </div>
            <div className="lg:col-span-4 lg:text-right">
              <a href="/editor/" className={`${PILL_PRIMARY} px-6 py-3.5`}>
                开始创作
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ：发丝线手风琴，不用描边卡片 */}
      <section id="faq" className={`${CONTAINER} scroll-mt-24 py-12 sm:py-16`}>
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <Eyebrow no="04" label="常见问题" />
            <h2 className={`mt-4 ${H2}`}>常见问题</h2>
          </div>
          <div className="lg:col-span-8">
            <div className="border-t border-paper-line">
              {FAQS.map((f) => (
                <details key={f.q} className="group border-b border-paper-line py-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[16px] font-medium tracking-[-0.01em] text-warm-ink">
                    {f.q}
                    <span className="shrink-0 text-warm-ash transition-transform group-open:rotate-180">
                      ▾
                    </span>
                  </summary>
                  <p className="mt-4 max-w-2xl text-[15px] leading-[1.6] tracking-[0.01em] text-warm-smoke">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA：留白收尾，单一黑药丸 */}
      <section className={`${CONTAINER} py-14 sm:py-20`}>
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <h2 className="text-[32px] font-medium leading-[1.13] tracking-[-0.02em] text-warm-ink sm:text-[40px] lg:text-[48px]">
              现在就去拼一张
            </h2>
            <p className="mt-4 text-[16px] leading-[1.6] tracking-[0.01em] text-warm-smoke">
              免费、无限制、无需注册，打开就能用。
            </p>
          </div>
          <div className="lg:col-span-4 lg:text-right">
            <a href="/editor/" className={`${PILL_PRIMARY} h-12 px-7`}>
              <IconSparkles className="h-4 w-4" />
              进入拼图编辑器
            </a>
          </div>
        </div>
      </section>

      {/* Footer：紧凑单带 + 顶部发丝线 */}
      <footer className="border-t border-paper-line">
        <div
          className={`${CONTAINER} flex flex-col items-start justify-between gap-4 py-10 text-sm text-warm-smoke sm:flex-row sm:items-center`}
        >
          <span className="text-xs tracking-[0.01em] text-warm-ash">
            © {new Date().getFullYear()} 多元拼图 · 免费在线拼图工具
          </span>
          <span className="flex items-center gap-8 text-sm font-medium">
            <a href="/editor/" className="transition-colors hover:text-warm-ink">编辑器</a>
            <a href="#features" className="transition-colors hover:text-warm-ink">功能</a>
            <a href="#faq" className="transition-colors hover:text-warm-ink">常见问题</a>
          </span>
        </div>
      </footer>
    </div>
  )
}
