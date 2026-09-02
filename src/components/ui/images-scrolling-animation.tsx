"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import ReactLenis from "lenis/react"
import { useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ArrowRight } from "lucide-react"

export interface CardData {
  id: number
  title: string
  desc: string
  image: string
  link: string
  video?: string
  categoryIndex?: number
}

export const StickyCard_001 = ({
  i,
  title,
  desc,
  image,
  link,
  video,
  categoryIndex,
  progress,
  range,
  targetScale,
}: CardData & {
  i: number
  progress: any
  range: [number, number]
  targetScale: number
}) => {
  const container = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  const scale = useTransform(progress, range, [1, targetScale])

  return (
    <div ref={container} className="sticky top-0 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <motion.div
        onClick={() => navigate(link, { state: categoryIndex !== undefined ? { categoryIndex } : undefined })}
        style={{
          scale,
          top: `calc(-5vh + ${i * 15 + 200}px)`,
          cursor: 'pointer'
        }}
        className="rounded-2xl sm:rounded-3xl lg:rounded-4xl relative -top-1/4 flex origin-top flex-col overflow-hidden
                   h-[400px] w-[320px] 
                   sm:h-[450px] sm:w-[400px] 
                   md:h-[500px] md:w-[600px] 
                   lg:h-[500px] lg:w-[800px] bg-white shadow-xl"
      >
        {video ? (
          <video
            src={video}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 h-full w-full object-cover z-0"
          />
        ) : (
          <img src={image || "/placeholder.svg"} alt={title} className="absolute inset-0 h-full w-full object-cover z-0" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
        
        <div className="relative z-20 pl-12 sm:pl-20 md:pl-24 pr-8 py-8 sm:py-12 flex flex-col justify-end h-full">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 sm:mb-3">{title}</h3>
              <p className="text-slate-200 text-base sm:text-lg mb-4 sm:mb-6">{desc}</p>
            </div>
            <Link 
              to={link}
              state={categoryIndex !== undefined ? { categoryIndex } : undefined}
              className="inline-flex items-center gap-2 font-bold text-base sm:text-lg text-[#10b981] uppercase tracking-wide"
            >
              VIEW DETAILS <ArrowRight size={20} />
            </Link>
        </div>
      </motion.div>
    </div>
  )
}

export const ImagesScrollingAnimation = ({ cards }: { cards: CardData[] }) => {
  const container = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  })

  // Safe fallback for ReactLenis if it is not exported as default
  const LenisComponent = (ReactLenis as any).ReactLenis || ReactLenis;

  return (
    <LenisComponent root>
      <main
        ref={container}
        className="relative flex w-full flex-col items-center justify-center 
                   pb-[50vh] pt-[5vh] 
                   sm:pb-[60vh] sm:pt-[8vh] 
                   lg:pb-[70vh] lg:pt-[10vh]"
      >
        <div className="mb-12 text-center w-full max-w-4xl px-4 z-10 relative">
            <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-br from-[#5cb878] to-[#387a9f] bg-clip-text text-transparent" style={{ margin: 0, padding: 0 }}>
              Material Divisions
            </h2>
        </div>
        {cards.map((card, i) => {
          const targetScale = Math.max(0.6, 1 - (cards.length - i - 1) * 0.08)
          return (
            <StickyCard_001
              key={`p_${i}`}
              i={i}
              {...card}
              progress={scrollYProgress}
              range={[i * 0.2, 1]}
              targetScale={targetScale}
            />
          )
        })}
      </main>
    </LenisComponent>
  )
}
