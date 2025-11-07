import React from 'react';

export const PrivacyPolicyPage: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">Privacy Policy</h1>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-8 space-y-6 text-gray-600 dark:text-gray-300 prose prose-indigo dark:prose-invert">
                <p><strong>Last Updated:</strong> [Date]</p>
                
                <p>Welcome to EDUSPPU 2024. We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our application.</p>

                <h2>Information We Collect</h2>
                <p>We may collect information about you in a variety of ways. The information we may collect via the Application includes:</p>
                <ul>
                    <li><strong>Personal Data:</strong> Personally identifiable information, such as your name and email address, that you voluntarily give to us when you register with the Application.</li>
                    <li><strong>Usage Data:</strong> Information that our servers automatically collect when you access the Application, such as your IP address, browser type, operating system, and the pages you have viewed.</li>
                </ul>

                <h2>Use of Your Information</h2>
                <p>Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Application to:</p>
                <ul>
                    <li>Create and manage your account.</li>
                    <li>Email you regarding your account.</li>
                    <li>Monitor and analyze usage and trends to improve your experience with the Application.</li>
                    <li>Notify you of updates to the Application.</li>
                </ul>

                <h2>Security of Your Information</h2>
                <p>We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.</p>

                <h2>Contact Us</h2>
                <p>If you have questions or comments about this Privacy Policy, please contact us at: [Contact Email Address]</p>
            </div>
        </div>
    );
};