import { useState } from "react";

export default function Main() {
    return (
        <div className="bg-gray-200 min-h-screen">
            <ContactUs />
        </div>
    )
}

const ContactUs = () => {

    const [percentages, setPercentages] = useState(0);
    const [enable, setEnable] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        const {name, email, message} = event.target.elements;

        if(enable === true) {
            return;
        }

        setEnable(true);

        const response = await fetch(
            '/api/message',
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name.value,
                    email: email.value,
                    message: message.value
                })
            }
        )

        if(response.status === 200) {

            const id = setInterval(() => {
                setPercentages((prev) => {
                    if(prev >= 100) {
                        clearInterval(id);
                        return 0;
                    }
                    return prev + 1;
                });
            }, 2000/100);
        }

    }

    return(
        <div className="relative">
            <div className={`${enable === true ? 'block' : 'hidden'} my-2 w-full fixed mt-0`}>
                <ProgressBar percentages={percentages} />
            </div>
            <div className="flex justify-center items-center h-screen rounded-sm">
                <div 
                    className="w-full mx-2 md:w-2/3 bg-gray-300 p-2 text-center rounded-md px-4">
                    <h2>Message</h2>
                    <small>This is a message from the main page.</small>
                    <form onSubmit={handleSubmit} className="">
                        <div className="my-2 flex">
                            <div className="w-2/12 text-right pr-2">
                                <label htmlFor="name" className="h-full align-middle">Name:</label>
                            </div>
                            <div className="w-10/12">
                                <input
                                    type="text"
                                    name="name"
                                    className="w-full rounded p-2 focus:outline-none" 
                                    required />
                            </div>
                        </div>
                        
                        <div className="my-2 flex">
                            <div className="w-2/12 text-right pr-2">
                                <label htmlFor="email" className="h-full align-middle">Email:</label>
                            </div>
                            <div className="w-10/12">
                                <input
                                    type="email"
                                    name="email"
                                    className="w-full rounded p-2 focus:outline-none" 
                                    required />
                            </div>
                        </div>

                        <div className="my-2 flex">
                            <div className="w-2/12 text-right pr-2">
                                <label htmlFor="message" className="h-full align-middle">Message:</label>
                            </div>
                            <div className="w-10/12">
                                <textarea 
                                    name="message" 
                                    id="" 
                                    cols="30" 
                                    rows="5"
                                    required
                                    className="w-full p-2 rounded focus:outline-none"></textarea>
                            </div>
                        </div>

                        <div className="my-2">
                        <button 
                            type="submit"
                            className={`${enable !== true ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 cursor-default'} p-2 rounded text-white`}
                            >Send</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

const ProgressBar = ({percentages}) => {
    return(
        <div className={`w-full bg-gray-200 rounded-full h-2.5`}>
            <div className="bg-blue-600 h-2.5 rounded-full" style={{width: `${percentages}%`}}></div>
        </div>
    )
}