# Pixel Police

<div align="center">
    <img src="https://github.com/nlok5923/attestation-rollup/assets/76112446/c4830889-b977-48c7-99c7-c14cf6a2307c" alt="Logo" height="300">
</div>

> A protocol that enables organisations to verify that digital content (image or video) is not GenAI/ Deepfake

## The Problem
In today's digital age, distinguishing authentic images from those generated by AI, especially in sensitive areas like news and social media, is increasingly challenging. Our protocol addresses this crucial need by offering a reliable solution for verifying and tracing the origin of digital content.

### Key Benefits and Features
#### Combatting AI-Generated Content in Media
Our protocol is a game-changer for news organizations and social media platforms. With the proliferation of sophisticated AI technologies capable of creating realistic images, these organizations often struggle to verify the authenticity of received content. Our solution ensures that only legitimate, unaltered images are circulated, upholding the integrity of information.

#### Empowering Citizen Journalism
We are not just creating a protocol; we are fostering a community of citizen journalists. By providing an app that integrates with our protocol, individuals can capture and share images confidently, knowing their authenticity will be preserved and verifiable.

#### Secure Image Authentication and History Tracking
When a user captures an image through our app, it is immediately signed with a private key on the device and attested on our rollup. Any subsequent edits are also recorded and attested. This process creates a transparent and traceable history for each image, enabling anyone to verify its authenticity and trace its origin.

#### Alignment with Emerging Industry Standards
Our work is in line with the Work-in-Progress (WIP) standard C2PA (Content Authenticity and Provenance), which is being adopted by industry giants like Adobe and Microsoft. This alignment not only validates our approach but also ensures compatibility and standardization across platforms.

## Challenges we ran into
#### Navigating the RISC-0 EVM Environment
One of the most significant challenges was adapting to the RISC-0 EVM, a constrained environment that made implementing arbitrary computation code particularly difficult. This required us to think creatively and develop tailored solutions that could operate efficiently within these limitations.

#### Custom Image Processing Algorithms
To address this, we developed our own image processing computations that are compatible with the RISC-0 EVM environment. Crafting these algorithms from scratch was a complex task, but it was crucial for ensuring our protocol could handle the intricate task of image verification and attestation.

#### Managing Digital Content and Metadata
Handling Vast Amounts of Data: A major part of our work involved dealing with extensive digital content, especially images and their metadata. This was necessary to build a solution compliant with the C2PA standard. Managing this large amount of data required sophisticated data processing and storage solutions.

#### Building a Custom Rollup
Developing a Unique Rollup: Perhaps the most ambitious part of our project was writing our own rollup. This involved creating a custom state machine with unique state transitions specifically designed to incorporate provable changes in digital content. The development of this rollup was critical in enabling our protocol to effectively trace and verify the history of an image or video.

## Verifiers Addresses
```
CELO: 0xe635E11E745A2Ae9d8fcb99611f2468b039208F9

Arbitrum: 0xd80da0b12a1487CadedE8F07e9B144f82D64230e

Base Goerli: 0x57D8C4870EDa80eD667d27f124226581B9822267

Polygon Zkevm: 0x534701c017Fd02F8ecD128D6175cE88e1A4871b3

Mantle Testnet: 0x9eb4827133aB5Db12DEAEa9188815Adf8184416F

Scroll Sepolia: 0x534701c017Fd02F8ecD128D6175cE88e1A4871b3

OKX Testnet: 0x57D8C4870EDa80eD667d27f124226581B9822267

```
## How to run this rollup

- Setup the rollup rpc server by following the steps from [here](https://github.com/nlok5923/attestation-rollup/tree/develop/rollup#setting-up-rollup-rpc). Make sure to save the `ngork` port forwarded url as you'll need it.
- Run the prover. Steps to run [here](https://github.com/nlok5923/attestation-rollup/blob/develop/prover/README.md#setting-up-prover)
- Start the mobile application with which you can capture + edit images by following [this](https://github.com/nlok5923/attestation-rollup/tree/develop/frontend-camera-attestor-mobile-app#readme) steps
- Start the explorer where you can see the history of images by following [this](https://github.com/nlok5923/attestation-rollup/tree/develop/frontend-history-explorer#history-explorer) steps
- To see the edits made on image and it's history at this url http://localhost:3001/:uuid (uuid is the unique identifier generated for every image you can get it from the logs of rollup rpc)

PS: All the image related data is being stored just for your current test session it would be reseted once you restart the rollup rpc server
