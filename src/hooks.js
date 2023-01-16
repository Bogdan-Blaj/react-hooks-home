import { useState, useEffect} from 'react';

export const useFetch = (url, initialValue) => {
    const [result, setResult] = useState(initialValue);

    useEffect( () => {
        fetch(url)
            .then(response => response.json())
            .then( json =>  setResult(json));
      }, [url]);
      return result;
}

export const useDynamicTransition = ({increment, delay, length}) => {
    const [index, setIndex] = useState(0);

    useEffect( () => {
        const interval = setInterval( () => {
            setIndex( storedIndex => { //storedIndex to use the latest store index, as it may change since the first call
            return (storedIndex + increment) % length;
        })
       }, delay);

       //cleanup to prevent the interval to continue on an unmount component
       return () => {
        clearInterval(interval);
        }
    }, [delay, increment]);

    return index;
}