import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

function StoreFooter() {
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const openMessage = (title) => {
    let content = "";
    if (title === "Terms & Conditions") {
      content = `
        <h1>ONLINE PURCHASE TERMS & CONDITIONS</h1>
        <p>Welcome to www.ptc-computer.com.kh, the official E-Commerce website of PETER TECH. In order for your online purchase to be effective, you are advised to read through our Terms and Conditions stated below, and agree to all our general online shopping conditions stated. Thus, please take some time to read it carefully.</p>
        <p>By selecting the ‘Click’ [I have read and agree to the website terms and conditions] consent box displayed on our E-Commerce website, www.ptc-computer.com.kh, you have read through and agreed to the Terms and Conditions of our online purchase policy, and as such, you agreed to place this online purchase order of our product(s), subject to the following Terms and Conditions:</p>
        <h2>I. Accuracy of Billing and Shipping Information</h2>
        <p>For the validity of this agreement to be effective, you must be in the legal age according to the laws and regulations stated by the Kingdom of Cambodia. When placing an order, you are obligated to provide all authentic and accurate details of your personal particulars for our processing and record, including your current living address or specified delivery address, authorized person (the person who comes to pick up goods on your behalf), and online payment methods relating to your purchase made at our store.</p>
        <p>You agree to promptly update your account and other information so that we can complete your transactions and contact you for a smooth and on-time delivery. Your submission of your personal information through the store is governed by our Privacy Policy.</p>
        <h2>II. Method of Payment</h2>
        <p>We accept Cash-on-Delivery*, Local Bank Transfer*, Debit and Credit Cards*, with our partner banks.</p>
        <h3>CASH ON DELIVERY:</h3>
        <p>After the order is placed, your order will be delivered within 1-2 working days after our customer service team successfully contacts you to verify all details required; the Cash Payment can be made upon the delivery time, right after receiving your good(s).</p>
        <ul>
          <li>Supported Currency: US Dollars or Khmer Riels.</li>
          <li>Note: No fee charge for delivery in Phnom Penh.</li>
          <li>Charge for delivery to other locations in Cambodia.</li>
          <li>No overseas delivery.</li>
        </ul>
        <h3>LOCAL BANK TRANSFERRING DIRECTLY</h3>
        <p>After the payment is received, your order will be delivered within 1-3 working days.</p>
        <ul>
          <li>This payment method takes 3 working days on Local Bank’s offices to process the payment to our company.</li>
          <li>Supported Currency: US Dollars or Khmer Riels.</li>
          <li>Note: No fee charge for delivery in Phnom Penh.</li>
          <li>Charge for delivery to other locations in Cambodia.</li>
          <li>No overseas delivery.</li>
        </ul>
        <h3>CREDIT AND DEBIT CARDS (VISA, MASTER CARDS AND UNION PAY)</h3>
        <p>This payment method takes 3-5 working days for our partner Credit and Debit Visa or Master Cards, or Union Pay offices to process the payment to our company. After receiving the successful payment, our customer service team will contact you to validate all details required and process your order. It should take 1-3 working days to prepare for the delivery of goods.</p>
        <ul>
          <li>Supported Cards: Visa Cards, Master Cards, and Union Pay.</li>
          <li>Supported Currency: US Dollars or Khmer Riels.</li>
          <li>Note: No fee charge for delivery in Phnom Penh.</li>
          <li>Charge for delivery to other locations in Cambodia.</li>
          <li>No overseas delivery.</li>
        </ul>
        <h2>III. Return & Exchange Policy</h2>
        <h3>GENERAL RETURN OR EXCHANGE POLICY</h3>
        <p>Customers are required to provide a valid and acceptable reason for this request, with submitting the clear copy of the purchase receipts for verification purpose. We accept returns on website purchases within 7 days after delivery. All defective products can be returned for replacement only (replacement the same new products or other products equally the same price) and we can’t be returned for refund. The processing period for the successful claims shall be within a reasonable time (generally 7 working days).</p>
        <p>PETER TECH agrees to replace goods if the goods are unaltered in the original conditions and original product packing (for example: on original strand). Otherwise, we will make our best efforts to arrange the exchange with our vendor, or accept the goods back for resale. In this case, if the return is authorized by PETER TECH, a restocking fee of up to 30% may apply (from 7-30 days).</p>
        <p>Products that are not defective can be returned for replacement, even if just for the product is unsatisfactory for the application, but must apply within 7 working days from the receival date of the goods. The customer should be responsible for return delivery costs for such request.</p>
        <p>Please note that if the plastic seal of a software package is broken, the return or exchange cannot be accepted due to copyrights and licensing restrictions, unless faulty nor defective. In this case we cannot help the customer to obtain a replacement copy of this software.</p>
        <p>The return or exchange of computer hardware and peripherals is sometimes not possible due to the third-party constraints on PETER TECH, unless a valid faulty evidence is presented, or an agreement between both parties are discussed and established, prior to purchase. All sales shall be considered firm sales.</p>
        <h2>IV. Warranty Information</h2>
        <p>All products sold by PETER TECH are covered by our vendors’ warranty, which accompanies the product, unless otherwise stated. PETER TECH makes no additional or independent warranty. PETER TECH does not warrant the performance, compatibility, integrity, merchantability, and fitness for a particular purpose of any product, but merely passes through to the customers whatsoever end-user warranty which our vendors software publishers shall provide, which tie-in with their respective products.</p>
        <p>Note: In accordance with the restrictions imposed by our vendors, any hardware that is defective upon arrival can generally be replaced if we are notified within 7 working days from the date of purchase, which is, the date stated in our invoice. Otherwise, the manufacturer’s warranty process must be followed.</p>
        <h2>V. Our Warranty Does Not Protect Against</h2>
        <p>After PETER TECH repairs or replaces the device, the warranty given does not protect against:</p>
        <ul>
          <li>Subsequent mishandling or misuse that causes the frame to bend, twist, or crack, and drops.</li>
          <li>Water damage.</li>
          <li>Subsequent accidental or purposeful drops.</li>
          <li>Tampering with internal hardware.</li>
          <li>Damage resulting from attempted customer repairs.</li>
          <li>Software issues unrelated to the repair.</li>
          <li>Jailbroken devices.</li>
          <li>New damages unrelated to the original repair.</li>
          <li>Any loss of data occurring as a result of the repair – customers are advised to back up all data prior to the repair attempt.</li>
          <li>Virus reinfection.</li>
          <li>Damage caused by electric shortage or surge.</li>
        </ul>
        <p>Our Warranty also does not cover the outcome of a repair if certain pre-repair conditions exist, including:</p>
        <ul>
          <li>Existence of known manufacturing and/or performance issues related to the device separate from the repair, as noted prior to the repair.</li>
          <li>Existence of damage to the frame of the device, as noted prior to the repair.</li>
          <li>Water damage.</li>
          <li>Jailbroken devices.</li>
          <li>Tampering with Internal Hardware: Under certain conditions, internal damage may make any repair impossible. PETER TECH or the company’s IT specialist will be able to explain in further detail upon diagnosing your specific device. If in doubt, we recommend that you do not attempt to repair on your own, as any damage may affect the repairability of your device.</li>
          <li>A non-working, damaged or severed home button/Bio-Metric scanner.</li>
          <li>Damage caused by electric shortage or surge.</li>
        </ul>
        <p>We also do not warranty on software setup.</p>
        <h2>VI. Repair Time and Delivery</h2>
        <p>PETER TECH will make reasonable efforts to deliver repaired equipment within the estimated time of delivery, but it does not guarantee that a repair will be completed within a specific period of time. PETER TECH shall not be liable for any failures or delay in service due to any cause beyond its control.</p>
        <p>PETER TECH reserves the right to refrain from providing the repairs or services ordered and instead refund customer’s payment at its sole discretion.</p>
        <h2>VII. Replacement Parts</h2>
        <p>You acknowledge that PETER TECH is an independent, third-party repair company not affiliated with any original manufacturer. Like any repair provider outside the original manufacturer, PETER TECH does not always have access to the original equipment manufacturer (OEM) parts.</p>
        <p>You acknowledge that after any service is performed, the damaged parts that are replaced during service become the property of PETER TECH. Upon payment made for any repair or service, you forfeit any claim on the damaged parts that were replaced during the repair or their value.</p>
        <h2>VIII. Responsibility to Pick Up Devices</h2>
        <p>Due to space limitations, PETER TECH requests that you pick up your goods and equipment promptly. If your goods or equipment are left with us and not picked up within 30 days after being notified by our company that your product has been serviced, PETER TECH reserves the right to treat your equipment as unclaimed goods after this specified grace period and may dispose of your goods or equipment in accordance with the applicable law.</p>
        <p>You agree to hold PETER TECH harmless for any damage or claim for the abandoned property (as stated in the signed work order every customer receives before the repair process is initiated), which we are given the authority to discard or recycle at our sole discretion 30 days from customer being notified that your product has been serviced.</p>
        <h2>IX. Accessing Data on Customer Devices</h2>
        <p>As part of our required diagnostic testing, certain applications containing customer data (such as camera, dial pad, and messaging applications) may need to be accessed thoroughly to test the device’s functionality. This process is essential to ensuring we have done our due diligence in repairing your device to the best of our ability. This information is never intentionally exposed in any way and will not be mishandled or sold to third-party companies for any purpose. PETER TECH will never transfer or copy data on a customer’s device to any other equipment without the customer’s express consent or unless the operation is required to complete the services requested by the customer.</p>
        <h2>X. Data Backup and Recovery Services</h2>
        <p>In the event of a repair or any similar circumstances which require a device to be restored to its original settings, PETER TECH will back up the data to the best of our ability for a minimum fee of $29 per user account. Though, if the data becomes lost or corrupted during the repair process, PETER TECH will not be responsible for the loss of data in view of such unforeseen circumstances.</p>
        <h2>XI. Limited Liability</h2>
        <p>Whilst PETER TECH shall make every effort to preserve the integrity of equipment left for repair, the Client agrees not to hold PETER TECH liable for any accidental damage to the said equipment including but not limited to casing cracks, scratches, deformations, theft of the equipment etc.</p>
        <p>Additionally, PETER TECH cannot be held liable for any loss of data, loss of revenue or profits, or any incidental, contingent, or consequential damages, howsoever caused either prior, during a service, or upon completion of a service.</p>
        <p>PETER TECH’s liability of any kind with respect to services undertaken, including any negligence on its part, shall be limited to the contract price for the services provided. Furthermore, should PETER TECH, its employees, or agents offer any advice or recommendations to a customer as to the use of computer equipment, storage, or use of software applications confirmed by whatever means is used entirely at the customer’s own risk. PETER TECH shall not be held liable for any such losses associated with such advice or recommendations.</p>
        <h2>XII. Customer’s Responsibilities</h2>
        <p>Software/Data Backup – It is the customer’s responsibility to complete a backup of all existing data, software, and programs on supported products prior to performing any services. PETER TECH will not be responsible for the loss of or recovery of data, programs, or loss of use systems or network. You understand and agree that under no circumstances will we be responsible for any loss of software, programs, or data, even if our technicians have attempted to assist you with your backup, recovery, or similar services. Any such assistance is beyond the scope of any warranty and this service agreement. The assistance is provided in our sole discretion and without any guarantee or warranty of any kind. Neither do we provide any guarantee or warranty of any kind with respect to any third-party product that our technician may use in assisting you.</p>
        <h2>This Agreement</h2>
        <p>All contracts formed between PETER TECH and the Customer shall be governed by and construed in accordance with and governed by the laws of Cambodia.</p>
        <p>Both parties agree that, in the event if any disputes not resolved by the normal complaint procedure, the matter shall be submitted to the court within the jurisdiction of Cambodia.</p>
        <h2>Correctness of Information and Disclaimer</h2>
        <p>Although every effort is made at all times to make sure the information contained in our website and in our documentation provided is accurate, current, and reliable, it should be recognized there is a possibility of errors in the information contained within. PETER TECH expressly denies any warranty of the accuracy and reliability of any information provided in their website or documentation.</p>
        <p>PETER TECH shall not be held liable for any losses caused by reliance upon the accuracy and reliability of the information contained within.</p>
        <p>PETER TECH cannot accept any responsibility for other websites we do not control, which may be linked to or from our website.</p>
        <p>It should be noted, that services and or products indicated in this website might be altered, modified or discontinued at any time without prior notice. It should also be noted that published fees for services, repairs, and or products are subject to change without prior notice.</p>
        <p>PETER TECH has the rights, and at our discretion, to refuse the supply of goods and services.</p>
        <p>PETER TECH reserves the rights to amend the content of our website and our Terms and Conditions at any time without prior notice.</p>
      `;
    } else if (title === "Privacy Policy") {
      content = `
        <h1>Privacy Policy</h1>
        <h2>Introduction</h2>
        <p>Welcome to PETER TECH. We value your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you visit this e-commerce website. Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, please do not access the site.</p>
        
        <h2>Information We Collect</h2>
        <h3>Personal Data</h3>
        <p>When you visit our site, we may collect personal information that you voluntarily provide to us, including but not limited to:</p>
        <ul>
          <li><strong>Contact Information:</strong> Name, email address, phone number, and postal address.</li>
          <li><strong>Account Information:</strong> Username, password, and other registration details.</li>
          <li><strong>Payment Information:</strong> Credit card details, billing address, and transaction history.</li>
          <li><strong>Order Information:</strong> Details about the products you purchase, such as product names, quantities, and prices.</li>
        </ul>
    
        <h3>Non-Personal Data</h3>
        <p>We may also collect non-personal information automatically when you interact with our website, including:</p>
        <ul>
          <li><strong>Log Data:</strong> IP address, browser type, operating system, and the dates and times of your visits.</li>
          <li><strong>Usage Data:</strong> Pages you visit, the time spent on those pages, and the links you click.</li>
        </ul>
    
        <h2>How We Use Your Information</h2>
        <p>We use the information we collect for various purposes, including:</p>
        <ul>
          <li><strong>To Process Transactions:</strong> To process and fulfill your orders, including sending you emails to confirm your order status and shipment.</li>
          <li><strong>To Improve Our Services:</strong> To understand how you use our site, to enhance user experience, and to develop new products and services.</li>
          <li><strong>To Communicate With You:</strong> To send you updates, marketing communications, and promotional offers that may interest you. You can opt-out of these communications at any time.</li>
          <li><strong>To Maintain Security:</strong> To protect against and prevent fraud, unauthorized transactions, claims, and other liabilities.</li>
        </ul>
    
        <h2>Sharing Your Information</h2>
        <p>We do not sell, trade, or otherwise transfer your personal information to third parties except in the following circumstances:</p>
        <ul>
          <li><strong>Service Providers:</strong> We may share your information with third-party service providers who assist us in operating our website, conducting our business, or servicing you, provided those parties agree to keep this information confidential.</li>
          <li><strong>Legal Requirements:</strong> We may disclose your information when we believe disclosure is appropriate to comply with the law, enforce our site policies, or protect our or others' rights, property, or safety.</li>
        </ul>
    
        <h2>Cookies and Tracking Technologies</h2>
        <p>Our website uses cookies and similar tracking technologies to enhance your experience. Cookies are small files that a site or its service provider transfers to your computer’s hard drive through your web browser (if you allow) that enables the site’s or service provider’s systems to recognize your browser and capture and remember certain information.</p>
        <p>You can choose to have your computer warn you each time a cookie is being sent, or you can choose to turn off all cookies. You do this through your browser settings. If you turn cookies off, some of the features that make your site experience more efficient may not function properly.</p>
    
        <h2>Data Security</h2>
        <p>We implement a variety of security measures to maintain the safety of your personal information when you place an order or enter, submit, or access your personal information. However, please be aware that no method of transmission over the Internet, or method of electronic storage, is 100% secure, and we cannot guarantee its absolute security.</p>
    
        <h2>Changes to This Policy</h2>
        <p>We may update this Privacy Policy from time to time to reflect changes to our practices or for other operational, legal, or regulatory reasons. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.</p>
    
        <h2>Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, please contact us using the information provided on our Contact Us page.</p>
      `;
    } else if (title === "About Us") {
      content = `
        <h1>About Us</h1>
        <p>Welcome to PETER TECH, the leading multi-vendor e-commerce platform for laptops in Cambodia. Our mission is to connect customers with top-quality laptops from a variety of trusted vendors, all in one convenient place.</p>
        <p>We offer a wide range of laptops to suit every need, from budget-friendly options to high-performance machines for professionals. Our platform ensures a seamless shopping experience with secure payment methods, fast shipping, and excellent customer service.</p>
      `;
    } else if (title === "Help") {
      content = `
        <h1>Help</h1>
        <p>Need assistance? We’re here to help! Whether you have questions about placing an order, need help with your account, or require support with our website features, our Help section has got you covered.</p>
        <p>Contact our support team, or explore our guides to find the answers you need. At PETER TECH, we strive to make your shopping experience as smooth as possible.</p>
      `;
    } else {
      content = `<h1>${title}</h1><p>This is the content for ${title}.</p>`;
    }

    setMessage(content);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <div>
      <footer style={footerStyle}>
        <div style={footerContainerStyle}>
          <div style={{ ...footerSectionStyle, ...logoSectionStyle }}>
            <img
              src="photo_2024-09-04_11-54-40.jpg"
              alt="PETER TECH"
              style={logoStyle}
            />
            <p>
              Opening Hours:
              <br />
              Monday to Sunday, 8:00 AM to 5:30 PM.
            </p>
          </div>
          <div style={footerSectionStyle}>
            <h4 style={headingStyle}>CONTACT US</h4>
            <p>
              <strong>Sales Showroom</strong>
              <br />
              📞 069 260 405
              <br />
              📞 066 362 958
            </p>
            <p>
              <strong>Service Center</strong>
              <br />
              📞 017 811 092
              <br />
              📞 088 479 5250
            </p>
          </div>
          <div style={footerSectionStyle}>
            <h4 style={headingStyle}>CONDITIONS APPLY</h4>
            <p
              style={linkStyle}
              onClick={() => openMessage("Terms & Conditions")}
            >
              Terms & Conditions
            </p>
            <p style={linkStyle} onClick={() => openMessage("Privacy Policy")}>
              Privacy Policy
            </p>
            <p style={linkStyle} onClick={() => openMessage("About Us")}>
              About Us
            </p>
            <p style={linkStyle} onClick={() => openMessage("Help")}>
              Help
            </p>
          </div>
          <div style={footerSectionStyle}>
            <h4 style={headingStyle}>MY ACCOUNT</h4>
            <p style={linkStyle} onClick={() => openMessage("Login")}>
              Login
            </p>
            <p style={linkStyle} onClick={() => openMessage("Order History")}>
              Order History
            </p>
            <p style={linkStyle} onClick={() => openMessage("My Wishlist")}>
              My Wishlist
            </p>
          </div>
        </div>
      </footer>

      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            dangerouslySetInnerHTML={{ __html: message }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

const footerStyle = {
  backgroundColor: "#f8f9fa",
  padding: "20px 0",
  fontFamily: "Arial, sans-serif",
};

const footerContainerStyle = {
  display: "flex",
  justifyContent: "space-around",
  alignItems: "flex-start",
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "0 20px",
};

const footerSectionStyle = {
  flex: 1,
  margin: "0 15px",
};

const headingStyle = {
  fontSize: "1rem",
  fontWeight: "bold",
  marginBottom: "10px",
};

const linkStyle = {
  textDecoration: "none",
  color: "inherit",
  cursor: "pointer",
  margin: "5px 0",
};

const logoStyle = {
  width: "150px",
  marginBottom: "10px",
};

const logoSectionStyle = {
  flex: 2,
};

export default StoreFooter;
