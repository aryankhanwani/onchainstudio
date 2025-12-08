'use client';

import { cn } from '@/lib/utils';

interface ShimmerButtonProps {
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
  className?: string;
  children: React.ReactNode;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export default function ShimmerButton({
  shimmerColor = '#ffffff',
  shimmerSize = '0.05em',
  borderRadius = '100px',
  shimmerDuration = '3s',
  background = 'rgba(255, 255, 255, 1)',
  className = '',
  children,
  onMouseEnter,
  onMouseLeave,
}: ShimmerButtonProps) {
  return (
    <button
      className={cn(
        'group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap border border-white/10 px-6 py-3 text-black',
        'transform-gpu transition-transform duration-300 ease-in-out active:translate-y-px rounded-full',
        className
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        '--spread': '90deg',
        '--shimmer-color': shimmerColor,
        '--radius': borderRadius,
        '--speed': shimmerDuration,
        '--cut': shimmerSize,
        '--bg': background,
      } as React.CSSProperties & {
        '--spread': string;
        '--shimmer-color': string;
        '--radius': string;
        '--speed': string;
        '--cut': string;
        '--bg': string;
      }}
    >
      <div className={cn('-z-30 blur-[2px]', 'absolute inset-0 overflow-visible [container-type:size] rounded-full')}>
        <div className="animate-shimmer-btn-shimmer-slide absolute inset-0 h-[100cqh] [aspect-ratio:1] rounded-full [mask:none]">
          <div
            className="animate-shimmer-btn-spin-around absolute -inset-full w-auto rotate-0 rounded-full [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))] [translate:0_0]"
          />
        </div>
      </div>
      {children}
      <div
        className={cn(
          'insert-0 absolute size-full',
          'rounded-2xl px-4 py-1.5 text-sm font-medium shadow-[inset_0_-8px_10px_#ffffff1f]',
          'transform-gpu transition-all duration-300 ease-in-out',
          'group-hover:shadow-[inset_0_-6px_10px_#ffffff3f]',
          'group-active:shadow-[inset_0_-10px_10px_#ffffff3f]'
        )}
      />
      <div
        className="absolute -z-20 [background:var(--bg)] [border-radius:var(--radius)] [inset:var(--cut)]"
      />
    </button>
  );
}

