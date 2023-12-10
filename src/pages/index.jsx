import Image from "next/image";

export default function Main() {
    return (
        <div className="bg-gray-200 min-h-screen">
            <ContactUs />
        </div>
    )
}


const PartI = () => {
    return (
        <div className="w-full p-2 h-screen">
            <div className="w-1/2 h-full"></div>
            <div className="w-1/2 h-full">
                <div
                    className="text-4xl font-bold text-center"
                >Hello! I'am Alfredo</div>
            </div>
        </div>
    )
}

const ContactUs = () => {

    async function handleSubmit(event) {
        event.preventDefault();
        const {message} = event.target.elements;

        const response = await fetch(
            '/api/message',
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    message: message.value
                })
            }
        )

    }

    return(
        <div className="flex justify-center items-center h-screen rounded-sm">
            <div 
                className="w-full mx-2 md:w-2/3 bg-gray-300 p-2 text-center">
                <h2>Message</h2>
                <small>This is a message from the main page.</small>
                <form onSubmit={handleSubmit}>
                    <textarea 
                        name="message" 
                        id="" 
                        cols="30" 
                        rows="5"
                        className="w-full rounded p-2 focus:outline-none"></textarea>
                    <button 
                        type="submit"
                        className="bg-blue-500 p-2 rounded text-white"
                    >Send</button>
                </form>
            </div>
        </div>
    )
}