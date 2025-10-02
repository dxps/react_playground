import { Search, AlignJustify, X } from 'lucide-react'
import { useRef, useState } from 'react'

const recentSearches = [
	'Bank transfer failed',
	'Add new card',
	'Pending transaction',
	'Currency exchange rates',
	'Payment history',
	'Refund request',
	'Transaction limits',
	'Link PayPal account',
	'Crypto deposit',
	'Delete saved beneficiary',
	'USD to EUR conversion',
	'Change billing address',
	'International transfer fee',
	'Activate virtual card',
	'Top-up wallet',
	'Suspicious activity alert',
	'2FA setup',
	'Download account statement',
	'Payment to Amazon',
	'Monthly subscription fee',
]

const Navbar = () => {
	const [searchModal, setSearchModal] = useState(false)
	const modalRef = useRef(null)

	return (
		<div className="sticky top-0 z-60">
			<nav
				className={`flex items-center justify-between border-b border-gray-100 dark:border-gray-800 dark:shadow-lg mb-4 bg-white dark:bg-gray-900 p-3 md:py-2 w-full`}
			>
				<div className="flex items-center gap-3 md:gap-5">
					<button
						// onClick={toggleSidebar}
						className="group h-fit cursor-pointer rounded-full p-2 bg-none hover:bg-green-100 dark:hover:bg-gray-800 opacity-100"
					>
						<AlignJustify
							size={24}
							strokeWidth={1}
							className="group-hover:text-green-500 dark:text-gray-100 dark:group-hover:text-green-500 text-black"
						/>
					</button>

					{searchModal && (
						<div className="flex items-start justify-start fixed md:static top-0 z-100 left-0 bg-[#000000a2] md:dark:bg-gray-900 w-full h-[100vh] md:h-fit p-5 md:p-0 md:bg-gray-900">
							<div
								ref={modalRef}
								className="rounded-lg bg-white dark:bg-gray-900 md:dark:bg-gray-900 dark:shadow-2xl md:dark:shadow-xs p-5 md:p-0 w-full"
							>
								<div className="flex items-center gap-4">
									<form
										action=""
										className="flex w-full relative md:w-[400px]"
									>
										<input
											type="text"
											placeholder="Search..."
											className="border-1 border-gray-200 dark:border-gray-700 md:dark:border-gray-800 text-gray-700 dark:text-gray-200 outline-none w-full p-2 md:p-2 pr-17 rounded-[8px]"
											required
										/>
										<button className="hidden md:block absolute right-0 h-full bg-green-400 dark:bg-green-500 px-5 rounded-tr-[8px] rounded-br-[8px] text-[1em] transition-ease-in-out duration-0.3s cursor-pointer">
											<Search
												size={20}
												color="white"
												strokeWidth={3}
												className="mr-2"
											/>
										</button>
									</form>
									<button
										onClick={() => setSearchModal(false)}
										className="cursor-pointer md:hidden text-gray-500 dark:text-white hover:text-red-400 dark:hover:text-red-400 transition-colors"
									>
										<X
											size={23}
											strokeWidth={4}
											className="dark:text-gray-400 dark:hover:text-orange-400"
										/>
									</button>
								</div>

								<div className="md:hidden mt-5">
									<h1 className="font-semibold text-lg text-gray-600 dark:text-gray-500 md-3 pb-4">
										Recent Searches
									</h1>
									<ul className="max-h-[300px] overflow-auto text-gray-600 text-sm dark:text-gray-200 space-y-4">
										{recentSearches.map((item, index) => (
											<li
												key={index}
												className="dark:hover:text-orange-400 dark:hover:cursor-pointer"
											>
												{item}
											</li>
										))}
									</ul>
								</div>
							</div>
						</div>
					)}

					{!searchModal && (
						<form
							action=""
							className="hidden md:flex w-full sm:w-[350px] md:w-[400px] relative"
						>
							<input
								type="text"
								placeholder="Search..."
								id="searchInput"
								className="border-1 border-gray-200 dark:border-gray-700 md:dark:border-gray-800 text-gray-700 dark:text-gray-200 outline-none w-full px-2 py-1 pr-17 rounded-[8px]"
								required
							/>
							<button className="absolute right-0 h-full bg-green-300 dark:bg-green-800 px-5 rounded-tr-[8px] rounded-br-[8px] text-[1em] transition-ease-in-out duration-0.3s cursor-pointer">
								<Search
									size={20}
									color="white"
									strokeWidth={3}
									className="mr-2"
								/>
							</button>
						</form>
					)}

					<button
						className="cursor-pointer md:hidden"
						onClick={() => {
							if (!searchModal) {
								setSearchModal(true)
							} else {
								setSearchModal(false)
							}
						}}
					>
						<Search
							size={20}
							strokeWidth={1.5}
							className="text-black dark:text-white"
						/>
					</button>
				</div>
			</nav>
		</div>
	)
}

export default Navbar
