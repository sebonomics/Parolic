"use client"

import type React from "react"
import { Area, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Label, ComposedChart } from "recharts"

interface ChartProps {
  data: any[]
  xAxis: any[]
  yAxis: any[]
  children: React.ReactNode
  className?: string
}

interface ChartAxisOptionsProps {
  x?: {
    label: string
    labelStyle?: React.CSSProperties
    tickStyle?: React.CSSProperties
    axisStyle?: React.CSSProperties
  }
  y?: {
    label: string
    labelStyle?: React.CSSProperties
    tickStyle?: React.CSSProperties
    axisStyle?: React.CSSProperties
  }
}

interface ChartTooltipContentProps {
  className?: string
  items: { label: string; value: number; color: string }[]
}

interface ChartLegendProps {
  items: { label: string; color: string }[]
}

interface ChartContainerProps {
  className?: string
  data: any[]
  xAxis: any[]
  yAxis: any[]
  children: React.ReactNode
}

interface ChartLineProps {
  dataKey: string
  stroke: string
  strokeWidth?: number
  dot?: boolean
}

interface ChartAreaProps {
  dataKey: string
  fill: string
}

const Chart = ({ data, xAxis, yAxis, children, className }: ChartProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        {xAxis.map((axis, i) => (
          <XAxis key={i} {...axis} />
        ))}
        {yAxis.map((axis, i) => (
          <YAxis key={i} {...axis} />
        ))}
        {children}
      </ComposedChart>
    </ResponsiveContainer>
  )
}

const ChartAxisOptions = ({ x, y }: ChartAxisOptionsProps) => {
  return (
    <>
      {x && (
        <XAxis>
          <Label value={x.label} position="bottom" style={x.labelStyle} />
        </XAxis>
      )}
      {y && (
        <YAxis>
          <Label value={y.label} angle={-90} position="left" style={y.labelStyle} />
        </YAxis>
      )}
    </>
  )
}

const ChartTooltip = ({ content }: any) => {
  return <Tooltip content={content} />
}

const ChartTooltipContent = ({ className, items }: ChartTooltipContentProps) => {
  return (
    <div className={className}>
      {items.map((item, i) => (
        <p key={i} style={{ color: item.color }}>
          {item.label}: {item.value}
        </p>
      ))}
    </div>
  )
}

const ChartLegend = ({ items }: ChartLegendProps) => {
  return <Legend formatter={(value, entry, index) => <span style={{ color: entry.color }}>{value}</span>} />
}

const ChartContainer = ({ data, xAxis, yAxis, children, className }: ChartContainerProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        {xAxis.map((axis, i) => (
          <XAxis key={i} {...axis} />
        ))}
        {yAxis.map((axis, i) => (
          <YAxis key={i} {...axis} />
        ))}
        {children}
      </ComposedChart>
    </ResponsiveContainer>
  )
}

const ChartLine = ({ dataKey, stroke, strokeWidth = 2, dot = true }: ChartLineProps) => {
  return <Line type="monotone" dataKey={dataKey} stroke={stroke} strokeWidth={strokeWidth} dot={dot} />
}

const ChartArea = ({ dataKey, fill }: ChartAreaProps) => {
  return <Area type="monotone" dataKey={dataKey} fill={fill} stroke={fill} />
}

export { Chart, ChartArea, ChartAxisOptions, ChartLine, ChartTooltip, ChartTooltipContent, ChartLegend, ChartContainer }

