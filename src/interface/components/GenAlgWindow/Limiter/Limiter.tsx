import React from 'react';

interface LimiterProps {
    source: any,
    limitations: Array<{ name: string, limit: number }>,
    setLimitations: React.Dispatch<React.SetStateAction<Array<{ name: string, limit: number }>>>
}

function Limiter({source, limitations, setLimitations}: LimiterProps) {
    return (
        <div className="flex flex-col gap-2 bordered p-2 rounded-md bg-white">
            {
                Object.keys(source).map((key, index) => (
                    <div key={index} className="flex justify-start gap-2">
                        <b className="uppercase">{key}:</b>
                        <input
                            className="px-2"
                            type="number"
                            name="limit"
                            id="limit"
                            min={0}
                            onChange={(event) => {
                                const value = Number(event.target.value)
                                const limitationsIndex = limitations.findIndex((limit) =>
                                    limit.name === key
                                )
                                console.log(limitations, key)

                                setLimitations((prevState) => {
                                    if (limitationsIndex === -1) {
                                        prevState.push({name: key, limit: value})
                                        return prevState
                                    }

                                    prevState[limitationsIndex].limit = value
                                    return [...prevState]
                                })
                            }}
                            defaultValue={Number.MAX_VALUE}/>
                    </div>
                ))
            }
        </div>
    );
}

export default Limiter;