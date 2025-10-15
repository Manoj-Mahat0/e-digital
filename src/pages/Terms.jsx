import React from "react";

export default function Terms() {
  const termsData = [
    {
      title: "1. Introduction",
      content: "Welcome to E Digital India Skill Development Institute. By enrolling in our courses, you agree to abide by the following terms and conditions. These terms govern your participation in our digital marketing training programs, including SMM, SEO, PHP web development, data science, and Android development."
    },
    {
      title: "2. Enrollment & Fees",
      content: [
        "Students must complete the registration process and submit the required documents before the commencement of the course.",
        "All course fees must be paid in advance.",
        "Course fees must be paid in full or in agreed-upon installments before attending classes.",
        "Fees are non-refundable except under special circumstances, subject to management approval."
      ]
    },
    {
      title: "3. Course Structure & Duration",
      content: [
        "The institute reserves the right to modify course content and schedules without prior notice.",
        "The institute reserves the right to modify the course structure, syllabus, faculty, and class schedules as necessary.",
        "Attendance of at least 75% is required to receive certification."
      ]
    },
    {
      title: "4. Code of Conduct",
      content: [
        "Users must provide accurate personal and educational information.",
        "Sharing of login credentials or course material is strictly prohibited.",
        "Students are expected to maintain discipline and professionalism within the institute premises and online classes.",
        "Any misconduct, harassment, or inappropriate behavior may lead to suspension or termination of enrollment."
      ]
    },
    {
      title: "5. Intellectual Property & Study Material",
      content: [
        "Course materials, including notes, presentations, and assignments, are the property of the institute and cannot be copied, shared, or distributed without prior consent.",
        "Violation of intellectual property rights will lead to legal action."
      ]
    },
    {
      title: "6. Certification & Assessment",
      content: [
        "Students must successfully complete assignments, projects, and exams to receive certification.",
        "The institute reserves the right to withhold certification if the student fails to meet academic requirements."
      ]
    },
    {
      title: "7. Placement Assistance",
      content: [
        "The institute provides placement support but guarantee job placements.",
        "Assistance includes resume building, interview preparation, and referrals based on performance.",
        "Job commitment is only valid upon successful completion of training and assessments."
      ]
    },
    {
      title: "8. Refund & Cancellation Policy",
      content: [
        "Refunds are not available for completed services.",
        "In case of cancellation before service commencement, 50% of the paid amount will be refunded.",
        "Custom or third-party expenses (e.g., ad spends, hosting) are non-refundable."
      ]
    },
    {
      title: "9. Limitation of Liability",
      content: [
        "The institute is not responsible for any loss, damage, or disruption caused by unforeseen circumstances, including technical issues.",
        "The student agrees to indemnify the institute against any claims arising from their participation in the course."
      ]
    },
    {
      title: "10. Amendments",
      content: [
        "The institute reserves the right to modify these terms & conditions at any time.",
        "Students will be notified of significant changes through official communication channels.",
        "By enrolling in our courses, you acknowledge that you have read, understood, and agreed to these terms and conditions.",
        "For any queries, contact us at: info@edigitalindian.com"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms & Conditions</h1>
          <p className="text-lg text-gray-600">Please read these terms carefully before enrolling in our courses.</p>
        </div>

        <div className="space-y-8">
          {termsData.map((section, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-8 border border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{section.title}</h2>
              {Array.isArray(section.content) ? (
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {section.content.map((item, idx) => (
                    <li key={idx} className="leading-relaxed">{item}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-700 leading-relaxed">{section.content}</p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600">
            If you have any questions about these Terms & Conditions, please contact us at{" "}
            <a href="mailto:info@edigitalindian.com" className="text-indigo-600 hover:text-indigo-800 font-medium">
              info@edigitalindian.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
