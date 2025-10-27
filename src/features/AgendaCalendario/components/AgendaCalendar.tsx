import { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

interface AgendaCalendarProps {
  onDateSelect?: (date: Date) => void;
  selectedDate?: Date;
}

export default function AgendaCalendar({ onDateSelect, selectedDate }: AgendaCalendarProps) {
  const [currentDate, setCurrentDate] = useState(selectedDate || new Date());
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const dayNames = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;

    const days = [];
    
    // Días del mes anterior
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i);
      days.push({ date: prevDate, isCurrentMonth: false });
    }

    // Días del mes actual
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ date: new Date(year, month, i), isCurrentMonth: true });
    }

    // Días del siguiente mes
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({ date: new Date(year, month + 1, i), isCurrentMonth: false });
    }

    return days;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(newDate.getMonth() - 1);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      return newDate;
    });
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date: Date) => {
    return selectedDate ? date.toDateString() === selectedDate.toDateString() : false;
  };

  const handleDateClick = (date: Date) => {
    if (onDateSelect) {
      onDateSelect(date);
    }
  };

  const days = getDaysInMonth(currentDate);

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-[#E2E8F0] p-6">
      {/* Header del calendario */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Calendar className="w-6 h-6 text-[#6366F1]" />
          <h2 className="text-[24px] leading-[32px] font-semibold text-[#0F172A]">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
        </div>

        <div className="flex items-center gap-4">
          {/* Selector de vista */}
          <div className="flex bg-[#F1F5F9] rounded-lg p-1">
            <button
              onClick={() => setViewMode('month')}
              className={`px-3 py-1.5 rounded-md text-[14px] font-semibold transition-all duration-200 ${
                viewMode === 'month'
                  ? 'bg-white text-[#6366F1] shadow-sm'
                  : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              Mes
            </button>
            <button
              onClick={() => setViewMode('week')}
              className={`px-3 py-1.5 rounded-md text-[14px] font-semibold transition-all duration-200 ${
                viewMode === 'week'
                  ? 'bg-white text-[#6366F1] shadow-sm'
                  : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              Semana
            </button>
            <button
              onClick={() => setViewMode('day')}
              className={`px-3 py-1.5 rounded-md text-[14px] font-semibold transition-all duration-200 ${
                viewMode === 'day'
                  ? 'bg-white text-[#6366F1] shadow-sm'
                  : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              Día
            </button>
          </div>

          {/* Navegación */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigateMonth('prev')}
              className="p-2 hover:bg-[#F8FAFC] rounded-lg transition-all duration-200"
            >
              <ChevronLeft className="w-5 h-5 text-[#64748B]" />
            </button>
            <button
              onClick={() => setCurrentDate(new Date())}
              className="px-3 py-1.5 text-[14px] font-semibold text-[#6366F1] hover:bg-[#EEF2FF] rounded-lg transition-all duration-200"
            >
              Hoy
            </button>
            <button
              onClick={() => navigateMonth('next')}
              className="p-2 hover:bg-[#F8FAFC] rounded-lg transition-all duration-200"
            >
              <ChevronRight className="w-5 h-5 text-[#64748B]" />
            </button>
          </div>
        </div>
      </div>

      {/* Vista mensual */}
      {viewMode === 'month' && (
        <div>
          {/* Nombres de los días */}
          <div className="grid grid-cols-7 gap-2 mb-2">
            {dayNames.map(day => (
              <div key={day} className="text-center font-semibold text-[12px] text-[#64748B] py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Días del mes */}
          <div className="grid grid-cols-7 gap-2">
            {days.map((day, index) => (
              <button
                key={index}
                onClick={() => handleDateClick(day.date)}
                className={`
                  aspect-square p-2 rounded-xl text-center transition-all duration-200
                  ${!day.isCurrentMonth ? 'text-[#94A3B8]' : 'text-[#0F172A]'}
                  ${isToday(day.date) ? 'bg-[#EEF2FF] border-2 border-[#6366F1]' : 'hover:bg-[#F8FAFC]'}
                  ${isSelected(day.date) ? 'bg-[#6366F1] text-white hover:bg-[#4F46E5]' : ''}
                `}
              >
                <div className="text-[14px] font-medium">{day.date.getDate()}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Vista semanal */}
      {viewMode === 'week' && (
        <div className="text-center py-12 text-[#64748B]">
          <p className="text-[14px]">Vista semanal en desarrollo</p>
        </div>
      )}

      {/* Vista diaria */}
      {viewMode === 'day' && (
        <div className="text-center py-12 text-[#64748B]">
          <p className="text-[14px]">Vista diaria en desarrollo</p>
        </div>
      )}
    </div>
  );
}

