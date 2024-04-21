import React from 'react'

function hero() {
  return (
    <section className="bg-black min-h-[90vh]">
  <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:items-center">
    <div className="mx-auto max-w-xl text-center">
      <h1 className="text-3xl font-extrabold sm:text-5xl text-sky-300">
      Documents & diagrams
        <strong className="font-extrabold text-white sm:block"> for engineering teams </strong>
      </h1>

      <p className="mt-4 sm:text-xl/relaxed text-white">
      All-in-one markdown editor, collaborative canvas, and diagram-as-code builder
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <a
          className="block w-full rounded border bg-white px-12 py-3 text-sm font-medium text-black shadow hover:bg-transparent hover:border-sky-300 hover:text-white hover:outline-none hover:ring sm:w-auto"
          href="signin"
        >
          Get Started
        </a>
      </div>
    </div>
  </div>
</section>
  )
}

export default hero;