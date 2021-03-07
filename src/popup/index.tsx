import React, {FunctionComponent, useState} from "react";
import {render} from "react-dom";
import {Ruler, WDKRequest, WDKRequestAction, WDKResponse, WDKResponseStatus} from "../common/types";

interface Props {
}

const sendMessage = function (message: WDKRequest): Promise<WDKResponse> {
    return new Promise(((resolve) => {
        chrome.tabs.query({currentWindow: true, active: true}, tabs => {
            const currentTabID = tabs[0]?.id;
            if (currentTabID) {
                chrome.tabs.sendMessage(currentTabID, message, (response: WDKResponse) => {
                    resolve(response);
                })
            }
        });
    }))
}

export const Popup: FunctionComponent<Props> = () => {
    const [rulers, setRulers] = useState(new Array<Ruler>());

    const addRuler = async function () {
        const {status, data} = await sendMessage({action: WDKRequestAction.RULER_ADD});
        if (status === WDKResponseStatus.SUCCESS) {
            setRulers(prevState => {
                return [...prevState, data as Ruler];
            })
        }
    }

    const removeRuler = async function (id: number) {
        const {status} = await sendMessage({action: WDKRequestAction.RULER_REMOVE, data: id});
        if (status === WDKResponseStatus.SUCCESS) {
            setRulers(prevState => {
                return prevState.filter(e => e.id != id);
            })
        }
    }

    const modifyRuler = async function (newValue: Ruler) {
        const {status} = await sendMessage({action: WDKRequestAction.RULER_MODIFY, data: newValue});
        if (status === WDKResponseStatus.SUCCESS) {
            setRulers(prevState => {
                const copy = [...prevState];
                const index = copy.findIndex(ruler => ruler.id === newValue.id)
                if (index > -1) {
                    copy[index] = newValue;
                }
                return copy;
            })
        }
    }

    return (
        <div>
            <h1>Web Dev Kit</h1>
            <section>
                <h2>Rulers</h2>
                {
                    rulers.forEach(ruler => {
                        return <RulerComponent ruler={ruler}
                                               onRemove={removeRuler}
                                               onModify={modifyRuler}/>
                    })
                }
                <button onClick={addRuler}>Add ruler</button>
            </section>
            <section>
                <h2>CSS Helper</h2>
            </section>
            <section>
                <h2>Font Helper</h2>
            </section>
        </div>
    );
}

interface RulerProps {
    ruler: Ruler,
    onRemove: Function,
    onModify: Function
}

const RulerComponent: FunctionComponent<RulerProps> = ({ruler, onModify, onRemove}) => {
    return (
        <div>
            <span>{ruler.id}</span>
            <div>
                <label htmlFor={ruler.id + "pos_x"}>x</label>
                <input type="number"
                       id={ruler.id + "pos_x"}
                       value={ruler.position.x}/>
            </div>
            <div>
                <label htmlFor={ruler.id + "pos_y"}>y</label>
                <input type="number"
                       id={ruler.id + "pos_y"}
                       value={ruler.position.y}
                       onInput={(event) => onModify({
                           ...ruler, position: {
                               x: ruler.position.x,
                               y: (event.target as HTMLInputElement).value
                           }
                       })}/>
            </div>
            <button onClick={() => onModify({...ruler, isViewed: true})}>
                View
            </button>
            <button onClick={() => onRemove(ruler.id)}>
                Remove
            </button>
        </div>
    )
}

render(<Popup/>, document.getElementById("popup"))