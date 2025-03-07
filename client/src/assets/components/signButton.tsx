export function SignButton({ text, onClick }: { text: string; onClick: (e: any) => any }) {
    return (
        <button
            onClick={onClick}
            className="w-full py-3 mt-4 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-blue-500/25"
        >
            {text}
        </button>
    );
}