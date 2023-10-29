import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'

export default function Modal({modal, setModal, setCity, setUnit, message}) {
  const [open, setOpen] = useState(true)

  const cancelButtonRef = useRef(null)

  const handleSubmit = ()=> {
    setCity(document.getElementById('city').value)
    setUnit(document.getElementById('unit').value)
  }

  return (
    <Transition.Root show={modal} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative w-96 transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className=" sm:items-center">
                    <div className="mt-3 text-center">
                      <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                        Setting
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          {message}
                        </p>
                      </div>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className='mt-3'>
                            <label htmlFor="city">City:</label>
                            <input type="text" name="city" id="city" className='w-10/12 border-gray-500 border-2 rounded-md ms-2' />
                        </div>
                        <div className="mt-4">
                            <label htmlFor="unit">Unit:</label>
                            <select name="unit" id="unit" className='w-10/12 text-center border-gray-500 border-2 rounded-md ms-2'>
                                <option value="Metric">Metric</option>
                                <option value="Imperial">Imperial</option>
                            </select>
                        </div>
                        <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 mt-5">
                            <button
                                type="button"
                                className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto"
                                onClick={handleSubmit}
                            >
                                Accept
                            </button>
                            <button
                                type="button"
                                className="mt-3 inline-flex w-full justify-center rounded-md bg-gray-300 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                onClick={() => setModal(false)}
                                ref={cancelButtonRef}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
