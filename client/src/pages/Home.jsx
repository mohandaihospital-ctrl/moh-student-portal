import logo from "@/assets/logo.png";
import homeimg from "@/assets/homeimg.jpeg";


export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#f5f7fa] text-[#111827]">
      {/* HEADER */}

      <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src={logo}
              alt="College Logo"
              className="w-24 h-24 object-contain"
            />

            {/* <div>
              <h1 className="text-2xl font-bold text-[#111827]">
                MOH Student Portal
              </h1>

              <p className="text-sm text-gray-500">
                Brochure Access Portal
              </p>
            </div> */}
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/login"
              className="hidden sm:flex px-5 h-11 items-center justify-center rounded-xl border border-gray-300 text-sm font-medium hover:bg-gray-100 transition"
            >
              Student Login
            </a>

            <a
              href="/register"
              className="px-5 h-11 flex items-center justify-center rounded-xl bg-[#ED1C24] text-white text-sm font-medium hover:bg-[#d4171e] transition"
            >
             Download Prospectus
            </a>
          </div>
        </div>
      </header>

      {/* HERO */}

     <section className="w-full overflow-hidden border-b border-gray-200 bg-white">

  <img
    src={homeimg}
    alt="Nursing Banner"
    className="w-full h-[250px] md:h-[400px] lg:h-[550px] object-cover"
  />

</section>

      {/* PROCESS */}

      <section className="py-20 bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <p className="text-[#ED1C24] font-semibold mb-3">
              Simple Process
            </p>

            <h3 className="text-4xl font-bold text-[#111827]">
              How It Works
            </h3>

            <p className="text-gray-600 mt-4 text-lg">
              Access official nursing program brochures in a few simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {[
              {
                number: '01',
                title: 'Create Account',
                desc: 'Register your student account securely.',
              },
              {
                number: '02',
                title: 'Complete Profile',
                desc: 'Fill your student information and course details.',
              },
              {
                number: '03',
                title: 'Access Brochure',
                desc: 'Unlock official nursing course brochures instantly.',
              },
              {
                number: '04',
                title: 'Explore Programs',
                desc: 'Review eligibility, curriculum, and fee details.',
              },
            ].map((item) => (
              <div
                key={item.number}
                className="rounded-3xl border border-gray-200 bg-[#f8fafc] p-8 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-red-50 text-[#ED1C24] flex items-center justify-center text-lg font-bold mb-6">
                  {item.number}
                </div>

                <h4 className="text-xl font-bold text-[#111827]">
                  {item.title}
                </h4>

                <p className="text-gray-600 mt-3 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROGRAMS */}

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <p className="text-[#ED1C24] font-semibold mb-3">
              Nursing Courses
            </p>

            <h3 className="text-4xl font-bold text-[#111827]">
              Programs Offered
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[
              'B.Sc Nursing',
              'Post Basic B.Sc Nursing',
              'GNM Nursing',
            ].map((course) => (
              <div
                key={course}
                className="bg-white border border-gray-200 rounded-3xl p-8 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center text-[#ED1C24] text-2xl mb-6">
                  🎓
                </div>

                <h4 className="text-2xl font-bold text-[#111827]">
                  {course}
                </h4>

                <p className="text-gray-600 mt-4 leading-relaxed">
                  Access complete course details, brochure information,
                  curriculum structure, and eligibility criteria.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}

      <section className="pb-20 px-6">
        <div className="max-w-6xl mx-auto rounded-[40px] bg-[#1F3A6D] overflow-hidden relative">
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl" />

          <div className="relative px-8 py-16 lg:px-16 lg:py-20 text-center">
            <h3 className="text-4xl lg:text-5xl font-bold text-white leading-tight max-w-4xl mx-auto">
              Start Exploring Nursing Programs Today
            </h3>

            <p className="text-blue-100 text-lg mt-6 max-w-2xl mx-auto leading-relaxed">
              Create your student account and access official nursing
              brochures, program details, and course information instantly.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
              <a
                href="/register"
                className="px-8 h-14 rounded-2xl bg-[#ED1C24] text-white font-semibold flex items-center justify-center hover:bg-[#d4171e] transition"
              >
                Create Account
              </a>

              <a
                href="/login"
                className="px-8 h-14 rounded-2xl border border-white/20 bg-white/10 text-white font-semibold flex items-center justify-center hover:bg-white/20 transition"
              >
                Student Login
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}

      <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm text-center md:text-left">
            © 2026 MOH Student Portal. All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-sm text-gray-500">
            <span>Email Support</span>
            <span>Privacy Policy</span>
            <span>Terms</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
