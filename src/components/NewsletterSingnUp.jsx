const NewsletterSignup = () => {
    return (
        <div className="w-full max-w-2xl mt-10 px-4 flex flex-col gap-6 items-start text-white">
            <h2 className="text-3xl font-semibold">Stay tuned</h2>
            <p className="text-lg text-gray-300">
                Don’t miss a step in the journey of discovery with NilAi. Join us as we uncover the hidden forces shaping a sustainable future and stay updated on every new initiative, story, and insight.
            </p>

            {/* Email Input and Submit */}
            <div className="w-full flex flex-col gap-2">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="flex-1 px-4 py-3 rounded-md bg-white text-black placeholder-gray-500 outline-none focus:ring-2 focus:ring-[#ff6a41]"
                    />
                    <button
                        aria-label="Subscribe"
                        className="p-3 rounded-md bg-[#ff6a41] text-white hover:bg-[#e85a34] transition cursor-pointer"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </button>
                </div>

                {/* Consent Checkbox */}
                <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
                    <input type="checkbox" className="accent-[#ff6a41]" />
                    I agree to receive communications.
                </label>
            </div>
        </div>
    );
};

export default NewsletterSignup;
