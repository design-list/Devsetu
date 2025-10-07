'use client';

import React, { useEffect, useState } from 'react';
import moment from 'moment';

const CountdownTimer = ({date, CountdownHeading}) => {

  const targetDate = moment.utc(date);
  
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = moment();
      const duration = moment.duration(targetDate.diff(now));

      if (duration.asSeconds() <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(duration.asDays()),
          hours: duration.hours(),
          minutes: duration.minutes(),
          seconds: duration.seconds(),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [date]);

  return (
    <div className="rounded-lg max-w-md">
      <h2 className="text-xl font-bold text-yellow-800 mb-4">
        {CountdownHeading}
      </h2>
      <div className="flex justify-start gap-4 text-lg font-semibold text-gray-800">
        <div className="flex flex-col items-center">
          <span className="text-3xl font-bold text-red-600">{timeLeft.days}</span>
          <span className="text-sm">Day</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-3xl font-bold text-red-600">{timeLeft.hours}</span>
          <span className="text-sm">Hours</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-3xl font-bold text-red-600">{timeLeft.minutes}</span>
          <span className="text-sm">Mins</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-3xl font-bold text-red-600">{timeLeft.seconds}</span>
          <span className="text-sm">Sec</span>
        </div>
      </div>
    </div>
  );
}

export default CountdownTimer;