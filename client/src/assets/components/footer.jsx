import facebookIcon from './../facebook_logo.png';
import instagramIcon from './../instagram_logo.png';
import twitterIcon from './../X_icon.png';
import linkedinIcon from './../linkedin_icon.png';

export default function Footer() {
    return (
        <footer className="bg-gray-300 dark:bg-gray-800 p-8 text-center">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Connect with Us
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
                Stay connected with Campus Exchange for updates and community highlights.
            </p>
            <div className="flex justify-center space-x-8 mb-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                    <img src={facebookIcon} alt="Facebook" className="w-8 h-8 hover:scale-110 transition-transform duration-300" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                    <img src={instagramIcon} alt="Instagram" className="w-8 h-8 hover:scale-110 transition-transform duration-300" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                    <img src={twitterIcon} alt="Twitter" className="w-8 h-8 hover:scale-110 transition-transform duration-300" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                    <img src={linkedinIcon} alt="LinkedIn" className="w-8 h-8 hover:scale-110 transition-transform duration-300" />
                </a>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
                © {new Date().getFullYear()} Campus Exchange. All rights reserved.
            </p>
        </footer>
    );
}
