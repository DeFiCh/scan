import { LoanVaultTokenAmount } from '@defichain/whale-api-client/dist/api/loan'
import { getAssetIcon } from '@components/icons/assets'
import { VaultCollapsibleSection } from '@components/vaults/[vaultid]/VaultCollapsibleSection'
import { OverflowTable } from '@components/commons/OverflowTable'
import React, { useState } from 'react'
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from 'react-icons/md'
import { Transition } from '@headlessui/react'
import BigNumber from 'bignumber.js'

export function VaultLoans (props: { loans: LoanVaultTokenAmount[] }): JSX.Element {
  return (
    <>
      <div className='hidden md:block mt-8' data-testid='VaultLoansDesktop'>
        <h2 className='text-xl font-semibold' data-testid='VaultLoansDesktop.Heading'>Loan Details</h2>

        {props.loans.length === 0
          ? (
            <div className='text-gray-400 flex w-full justify-center p-12'>
              There are no loans taken in the vault at this time
            </div>
            ) : (
              <OverflowTable className='mt-4 md:w-1/2 xl:w-1/3'>
                <OverflowTable.Header>
                  <OverflowTable.Head title='Loan Token' />
                  <OverflowTable.Head title='Loan Amount' testId='VaultLoansDesktop.LoanAmount' alignRight />
                </OverflowTable.Header>
                {props.loans.map((loan) => (
                  <VaultLoansTableRow loan={loan} key={loan.id} />
                ))}
              </OverflowTable>
            )}
      </div>

      <VaultCollapsibleSection heading='Loan Details' className='block md:hidden'>
        <div className='flex flex-col items-center'>
          {props.loans.length === 0
            ? (
              <div className='text-gray-400 flex w-full justify-center p-12'>
                There are no loans taken in the vault at this time
              </div>
              ) : (
                props.loans.map((loan) => (
                  <VaultLoanDetailsCard loan={loan} key={loan.id} />
                ))
              )}
        </div>
      </VaultCollapsibleSection>
    </>
  )
}

function VaultLoansTableRow (props: { loan: LoanVaultTokenAmount }): JSX.Element {
  const LoanSymbol = getAssetIcon(props.loan.displaySymbol)
  return (
    <OverflowTable.Row>
      <OverflowTable.Cell>
        <div className='flex items-center space-x-1'>
          <LoanSymbol className='h-6 w-6' />
          <span>{props.loan.name}</span>
        </div>
      </OverflowTable.Cell>
      <OverflowTable.Cell alignRight>
        {new BigNumber(props.loan.amount).toFixed(8)}
      </OverflowTable.Cell>
    </OverflowTable.Row>
  )
}

function VaultLoanDetailsCard (props: { loan: LoanVaultTokenAmount }): JSX.Element {
  const LoanSymbol = getAssetIcon(props.loan.displaySymbol)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <div
      className='p-4 border border-gray-200 rounded w-full justify-self-center md:justify-self-stretch'
      data-testid='VaultLoanDetailsCard'
    >
      <div className='flex items-center justify-between'>
        <div className='flex items-center'>
          <LoanSymbol className='h-6 w-6' />
          <span className='ml-1.5 font-medium text-gray-900'>{props.loan.name}</span>
        </div>
        <div className='hidden flex items-center text-primary-500 cursor-pointer' onClick={() => setIsOpen(!isOpen)}>
          {!isOpen
            ? <>VIEW<MdOutlineKeyboardArrowDown size={28} /></>
            : <>HIDE<MdOutlineKeyboardArrowUp size={28} /></>}
        </div>
      </div>
      <div className='flex items-center justify-between mt-10'>
        <span className='text-gray-500 text-sm'>Loan Amount</span>
        {new BigNumber(props.loan.amount).toFixed(8)}
      </div>

      <Transition
        enter='transition ease-out duration-200'
        enterFrom='opacity-0 translate-y-0'
        enterTo='opacity-100 translate-y-1'
        leave='transition ease-in duration-150'
        leaveFrom='opacity-100 translate-y-1'
        leaveTo='opacity-100 translate-y-0'
        className='w-full'
        show={isOpen}
      >
        {/* <div className='w-full mt-2 flex flex-col gap-y-1'> */}
        {/*  <div className='w-full flex justify-between'> */}
        {/*    <span className='text-gray-500 text-sm'>Loan ID</span> */}
        {/*    <span className='text-gray-900'>{`${loan.id}`}</span> */}
        {/*  </div> */}
        {/* </div> */}
      </Transition>
    </div>
  )
}