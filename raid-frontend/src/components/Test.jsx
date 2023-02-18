import { useMatch } from '@tanstack/react-location';

export default function Test() {
    const {
        data
    } = useMatch()
    console.log(data)
    return (
        <div>
            <h1>Hello </h1>
        </div>
    )
}
