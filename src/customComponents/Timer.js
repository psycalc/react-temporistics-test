import React from 'react';

function Timer({ duration }) {
 const [timeLeft, setTimeLeft] = React.useState(duration);

 React.useEffect(() => {
 const intervalId = setInterval(() => {
 setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
 }, 1000);

 return () => clearInterval(intervalId);
 }, []);

 return <div>Час, що залишився: {timeLeft} секунд</div>;
}

export default Timer;
