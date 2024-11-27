import { useEffect } from "react"

function Message() {
    useEffect(() => {
        console.log('Message mounted!!');

        return () => {
            console.log('Message unmounted!!');
        }
    }, [])
    return (
        <div>Message Component</div>
    )
}

export default Message;