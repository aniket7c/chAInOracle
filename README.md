# Global Event Prediction Project

This project is aimed at predicting global events by leveraging decentralized data fetched using Chainlink, processed with AI data models like Gemini, and stored on the Morph L2 blockchain. The predictions are then displayed in a user-friendly frontend interface.

## Technologies Used

- **Chainlink**: Utilized for accessing decentralized data feeds regarding global events.
- **Gemini**: AI data model used for processing fetched data and generating predictions.
- **Morph L2 Blockchain**: Used for storing prediction data securely.
- **Frontend**: HTML, CSS, and JavaScript, with Next.js for building the user interface.
- **Integration Testing**: Thorough testing of the interaction between different components.

## Contracts Deployed
- **FunctionsConsumer**: https://sepolia.etherscan.io/address/0x7965031031ceab380f9fd32d3ea46770d74141a9
- **Arbitrum FunctionConsumer**: https://sepolia.arbiscan.io/address/0xe815573125370493033DF0b2592d589CFb825b7E
- **MorphContract**: For storing the processed data temporarily, https://explorer-testnet.morphl2.io/address/0x57f1e46aC5DBd2A7c2c356E39066212E84A0C114

## Project Overview

The project initiates its workflow by tapping into a network of prominent news APIs to extract comprehensive global events data. This rich dataset is then meticulously channeled through the sophisticated processing capabilities of Gemini AI, seamlessly integrated within the Chainlink functions oracle infrastructure. This intricate orchestration ensures that the data undergoes thorough analysis and refinement, harnessing the power of artificial intelligence to glean valuable insights.

Once the data is meticulously processed and refined, it finds a secure abode within the Morph L2 blockchain, a robust platform renowned for its scalability and resilience. By leveraging the capabilities of Morph L2, the project ensures that the stored information remains immutable and accessible, facilitating seamless scalability as the volume of data grows over time.

With the data securely stored and ready for consumption, the project transitions to its frontend interface, where users are greeted with a dynamic and intuitive web application. Through this interface, users can effortlessly navigate through the wealth of curated global event predictions, gaining valuable insights and staying informed about significant developments worldwide.
