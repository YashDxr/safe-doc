import { useLocation } from "react-router-dom";

export default function Home() {
  const location = useLocation();
  let username = "";

  if (location && location.state) {
    username = location.state.username;
    localStorage.setItem("username", location.state.username);
  }

  return (
    <div className="min-h-screen p-10">
      <div className="container mx-auto py-8">
        <header className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 font-serif">
            Welcome {username}
          </h1>
          <h1 className="text-5xl font-bold text-gray-800 mb-4 font-serif">
            Safe-Doc: Secure Document Management System
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Your ultimate solution for managing personal documents securely on
            the cloud.
          </p>
        </header>

        <section className="my-8">
          <h1 className="text-3xl font-semibold text-gray-800 mb-4 font-serif">
            About
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Safe-Doc is a revolutionary document management system designed to
            empower users with complete control over their personal documents in
            the digital realm. Developed by a team of dedicated students,
            Safe-Doc offers a secure and intuitive platform for storing,
            accessing, and managing sensitive data on the cloud. With Safe-Doc,
            users can upload their documents with confidence, knowing that each
            file undergoes rigorous encryption before being stored, ensuring
            the utmost privacy and confidentiality. Whether it's accessing files
            on the go, collaborating with colleagues, or sharing documents
            securely with clients, Safe-Doc provides a seamless and efficient
            solution tailored to the modern user's needs. From its intuitive
            interface to its robust security features, Safe-Doc is poised to
            revolutionize the way individuals and businesses manage their
            documents, offering peace of mind and unparalleled control over
            digital assets. Say goodbye to the hassles of traditional document
            management and embrace the future of secure and efficient data
            handling with Safe-Doc.
          </p>

          <h1 className="text-3xl font-semibold text-gray-800 mb-4 font-serif">
            Cloud Computing
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            The cloud represents a transformative paradigm shift in the realm of
            computing, offering unparalleled flexibility, scalability, and
            accessibility. At its core, the cloud refers to a network of remote
            servers hosted on the internet, collectively providing a wide array
            of services ranging from storage to computation. One of its most
            significant advantages lies in its scalability, allowing users to
            dynamically adjust their computing resources based on demand,
            thereby eliminating the constraints imposed by physical
            infrastructure. Additionally, the cloud fosters collaboration and
            innovation by enabling seamless data sharing and real-time
            communication among geographically dispersed teams. Furthermore,
            cloud services offer robust security measures, including encryption
            and authentication protocols, safeguarding sensitive data from
            unauthorized access and cyber threats. From individuals to large
            enterprises, the cloud democratizes access to cutting-edge
            technologies, empowering users to leverage advanced computing
            capabilities without the burden of managing complex infrastructure.
            As businesses increasingly embrace digital transformation, the cloud
            emerges as a pivotal enabler, driving efficiency, agility, and
            innovation across industries. In essence, the cloud epitomizes the
            future of computing, reshaping the landscape of technology and
            redefining the way we work, collaborate, and innovate in the digital
            age.
          </p>

          <h1 className="text-3xl font-semibold text-gray-800 mb-4 font-serif">
            Encryption Technology
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Encryption is the process of converting information or data into a
            code to prevent unauthorized access. It plays a crucial role in
            safeguarding sensitive information, such as personal data, financial
            records, and communications, from interception or theft by
            unauthorized parties. Through encryption, data is transformed into
            an unreadable format using algorithms and cryptographic keys,
            ensuring that only authorized individuals with the corresponding
            decryption key can access and decipher the original information.
            This powerful technique serves as a cornerstone of cybersecurity,
            providing confidentiality, integrity, and privacy in an increasingly
            digital world.
          </p>

          <section className="my-8">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4 font-serif">
              Empowerment Through Encryption
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Safe-Doc goes the extra mile in ensuring the security of your
              documents. Upon upload, your documents undergo encryption,
              guaranteeing that only authorized users can access and view the
              content.
            </p>
          </section>

          <section className="my-8">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4 font-serif">
              Experience Safe-Doc Today
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Join the ranks of satisfied users who entrust their document
              management needs to Safe-Doc. With its intuitive interface, robust
              security features, and seamless cloud integration, Safe-Doc is the
              ultimate solution for modern document management.
            </p>
          </section>
        </section>
      </div>
    </div>
  );
}
