# Token Sentiment Analysis Project

This project is aimed at analyzing market sentiment by leveraging decentralized data fetched using Chainlink, processed with AI models like Gemini. It highlights the top 3 relevant news items and stores the sentiment on-chain for transparency.

## Technologies Used

- **Chainlink**: Utilized for accessing decentralized data feeds regarding global events.
- **Gemini**: AI data model used for processing fetched data and generating predictions.
- **Ethereum**: Blockchain platform used for executing smart contracts and storing sentiment prediction results securely.
- **Frontend**: HTML, CSS, and JavaScript, with Next.js for building the user interface.
- **Integration Testing**: Thorough testing to validate the interaction and reliability across smart contracts, AI processing, and frontend components.

## Contracts Deployed

- **FunctionsConsumer**: [Sepolia Contract](https://sepolia.etherscan.io/address/0x7956931031ecab389fdf432aa467f0741414a1a9)
- **Arbitrum FunctionConsumer**: [Arbitrum Contract](https://sepolia.arbiscan.io/address/0xe83f5573125370493930f0b529d5890cfb982b57e)

## Project Overview

Chain Oracle is designed to bridge the gap between real-world information and on-chain decision-making by integrating advanced oracle infrastructure with powerful AI analysis.

Once the news data is retrieved, it is routed to Gemini—an advanced AI language model that performs a multi-stage analysis. Gemini parses the articles to extract meaningful context, filters them based on relevance, and assigns sentiment scores.

The final sentiment data is stored on-chain, making it accessible to smart contracts, dApps, and end-users. This on-chain visibility ensures transparency and enables real-time dashboards. With the data securely stored and ready for consumption, the project transitions to its frontend interface, offering a dynamic and intuitive web experience.
