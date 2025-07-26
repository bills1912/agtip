import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface StatusCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: LucideIcon;
  variant: 'primary' | 'success' | 'warning' | 'danger';
  trend?: {
    direction: 'up' | 'down';
    value: string;
    color: string;
  };
  className?: string;
}

const gradientVariants: Record<StatusCardProps['variant'], string> = {
  primary: 'gradient-primary',
  success: 'gradient-success', 
  warning: 'gradient-warning',
  danger: 'gradient-danger'
};

export const StatusCard: React.FC<StatusCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  variant,
  trend,
  className = ''
}) => {
  return (
    <div className={`${gradientVariants[variant]} text-white p-6 rounded-lg ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white/80">{title}</p>
          <p className="text-3xl font-bold">{value}</p>
        </div>
        <Icon className="h-12 w-12 text-white/60" />
      </div>
      {trend && (
        <div className="flex items-center mt-2">
          <span className={`text-sm ${trend.color}`}>{trend.value}</span>
        </div>
      )}
      <p className="text-sm text-white/80">{subtitle}</p>
    </div>
  );
};