# Sentiment Analysis

This project is aimed at analyzing market sentiment by leveraging decentralized data fetched using Chainlink, processed with AI models like Gemini, and stored on-chain for transparency. The sentiment predictions are then displayed through a clean and intuitive frontend interface.


## Technologies Used

- **Chainlink**: Utilized for accessing decentralized data feeds regarding global events.
- **Gemini**: AI data model used for processing fetched data and generating predictions.
- **Ethereum**: Blockchain platform used for executing smart contracts and storing sentiment prediction results securely.
- **Frontend**: HTML, CSS, and JavaScript, with Next.js for building the user interface.
- **Integration Testing**: Thorough testing to validate the interaction and reliability across smart contracts, AI processing, and frontend components.

## Contracts Deployed
- **FunctionsConsumer**: https://sepolia.etherscan.io/address/0x7965031031ceab380f9fd32d3ea46770d74141a9
- **Arbitrum FunctionConsumer**: https://sepolia.arbiscan.io/address/0xe815573125370493033DF0b2592d589CFb825b7E

## Project Overview

Chain Oracle is designed to bridge the gap between real-world information and on-chain decision-making by integrating advanced oracle infrastructure with powerful AI analysis. The process begins with Chainlink Functions fetching real-time news data from multiple high-quality sources, including major crypto and financial news APIs. This off-chain data is transmitted securely and verifiably to smart contracts, ensuring that only authenticated and tamper-proof information reaches the blockchain. This seamless data flow lays the foundation for intelligent, insight-driven automation within decentralized ecosystems.

Once the news data is retrieved, it is routed to Gemini—an advanced AI language model—that performs a multi-stage analysis. Gemini parses the articles to extract meaningful context, filters out irrelevant or low-quality content, and identifies the top three most impactful news pieces for each target cryptocurrency. Using natural language processing and sentiment evaluation, the model then determines whether the prevailing sentiment is bullish, bearish, or neutral. This refined sentiment score becomes the core output of Chain Oracle, representing an AI-enhanced snapshot of market perception.

The final sentiment data is stored on-chain, where it becomes accessible to smart contracts, dApps, and end-users. This on-chain visibility ensures transparency and enables real-time dashboards or automated strategies to act on trustworthy insights. Developers and traders can build on top of this layer to power DeFi protocols, governance decisions, or automated trading logic. By combining decentralized infrastructure with AI intelligence, Chain Oracle sets a new standard for integrating external world signals into the blockchain in a reliable, verifiable, and insightful way.
