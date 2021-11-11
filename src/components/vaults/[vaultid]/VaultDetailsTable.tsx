import { LoanVaultActive, LoanVaultLiquidated } from '@defichain/whale-api-client/dist/api/loan'
import { AddressLink } from '@components/commons/AddressLink'
import ReactNumberFormat from 'react-number-format'
import { PropsWithChildren, ReactNode } from 'react'
import { HoverPopover } from '@components/commons/popover/HoverPopover'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import { Collapsible } from '@components/commons/Collapsible'
import classNames from 'classnames'
import { OverflowTable } from '@components/commons/OverflowTable'

interface VaultDetailListProps {
  children: ReactNode
  heading: string
  description: string
  testId?: string
}

interface InformationPopOverProps {
  heading: string
  description: string
  className?: string
  testId?: string
}

export function VaultDetailsTable ({ vault }: {vault: LoanVaultActive | LoanVaultLiquidated}): JSX.Element {
  return (
    <div className='mt-10'>
      <VaultDetailsMobile vault={vault} />
      <VaultDetailsDesktop vault={vault} />
    </div>
  )
}

function VaultTableRow ({ vault }: {vault: any}): JSX.Element {
  return (
    <OverflowTable.Row>
      <OverflowTable.Cell>
        <AddressLink address='eufhrhf9erh9' className='break-all' testId='VaultTableRow.OwnerId' />
      </OverflowTable.Cell>
      <OverflowTable.Cell className='text-right'>
        {(() => {
          if ('loanValue' in vault) {
            return <ReactNumberFormat value={vault.loanValue} prefix='$' displayType='text' thousandSeparator />
          }
          return 'N/A'
        })()}
      </OverflowTable.Cell>
      <OverflowTable.Cell className='text-right'>
        {(() => {
          if ('collateralValue' in vault) {
            return <ReactNumberFormat value={vault.collateralValue} prefix='$' displayType='text' thousandSeparator />
          }
          return 'N/A'
        })()}
      </OverflowTable.Cell>
      <OverflowTable.Cell className='text-right'>
        {(() => {
          if ('collateralRatio' in vault) {
            const ratio = (Number(vault.collateralRatio) / Number(vault.loanValue)).toFixed(2)
            return <ReactNumberFormat value={ratio} displayType='text' suffix='%' />
          }
          return 'N/A'
        })()}
      </OverflowTable.Cell>
      <OverflowTable.Cell className='text-right'>
        N/A
      </OverflowTable.Cell>
      <OverflowTable.Cell className='text-right'>
        N/A
      </OverflowTable.Cell>
    </OverflowTable.Row>
  )
}

function VaultDetailsMobile ({ vault }: {vault: any}): JSX.Element {
  return (
    <Collapsible heading='Vault Details' className='block md:hidden mt-6'>
      <VaultDetailList
        heading='Owner Id'
        description={'Vault owner\'s address'}
      >
        <AddressLink address='eufhrhf9erh9' className='break-all' testId='VaultTableRow.OwnerIdMobile' />
      </VaultDetailList>
      <VaultDetailList
        heading='Total Loan Value(USD)'
        description='Total loan value (in USD) taken by the vault.'
        testId='VaultDetailList.tlv'
      >
        {(() => {
          if ('loanValue' in vault) {
            return <ReactNumberFormat value={vault.loanValue} prefix='$' displayType='text' thousandSeparator />
          }
          return 'N/A'
        })()}
      </VaultDetailList>
      <VaultDetailList
        heading='Total Collateral Value(USD)'
        description='Total value of tokens (in USD) deposited as collaterals in the vault.'
      >
        {(() => {
          if ('collateralValue' in vault) {
            return <ReactNumberFormat value={vault.collateralValue} prefix='$' displayType='text' thousandSeparator />
          }
          return 'N/A'
        })()}
      </VaultDetailList>
      <VaultDetailList
        heading='Total Collateral Ratio'
        description='Percentage of collaterals deposited in a vault in relation to the amount of loan taken.'
      >
        {(() => {
          if ('collateralRatio' in vault) {
            const ratio = Number(vault.collateralRatio) / 100
            return <ReactNumberFormat value={ratio} displayType='text' suffix='%' />
          }
          return 'N/A'
        })()}
      </VaultDetailList>
      <VaultDetailList
        heading='Min Collateral Ratio'
        description='Minimum required collateral ratio based on vault scheme selected by vault owner.'
      >
        N/A
      </VaultDetailList>
      <VaultDetailList
        heading='Base Interest Ratio(APR)'
        description='Annual Vault Interest Rate based on the scheme selected by the vault owner.'
      >
        N/A
      </VaultDetailList>
    </Collapsible>
  )
}

function VaultDetailsDesktop ({ vault }: {vault: any}): JSX.Element {
  return (
    <div className='hidden md:block'>
      <h2 className='text-xl font-semibold' data-testid='VaultDetailsDesktop.Heading'>
        Vault Details
      </h2>
      <OverflowTable className='mt-6'>
        <OverflowTable.Header>
          <OverflowTable.Head>
            <InformationPopOver
              heading='Owner Id'
              description={'Vault owner\'s address'}
              testId='VaultDetailsDesktop.OwnersId'
            />
          </OverflowTable.Head>
          <OverflowTable.Head>
            <InformationPopOver
              className='justify-end'
              heading='Total Loan Value(USD)'
              description='Total loan value (in USD) taken by the vault.'
              testId='VaultDetailsDesktop.tlv'
            />
          </OverflowTable.Head>
          <OverflowTable.Head>
            <InformationPopOver
              className='justify-end'
              heading='Total Collateral Value(USD)'
              description='Total value of tokens (in USD) deposited as collaterals in the vault.'
              testId='VaultDetailsDesktop.tcv'
            />
          </OverflowTable.Head>
          <OverflowTable.Head>
            <InformationPopOver
              className='justify-end'
              heading='Total Collateral Ratio'
              description='Percentage of collaterals deposited in a vault in relation to the amount of loan taken.'
              testId='VaultDetailsDesktop.tcr'

            />
          </OverflowTable.Head>
          <OverflowTable.Head>
            <InformationPopOver
              className='justify-end'
              heading='Min Collateral Ratio'
              description='Minimum required collateral ratio based on vault scheme selected by vault owner.'
              testId='VaultDetailsDesktop.mcr'
            />
          </OverflowTable.Head>
          <OverflowTable.Head>
            <InformationPopOver
              className='justify-end'
              heading='Base Interest Ratio(APR)'
              description='Annual Vault Interest Rate based on the scheme selected by the vault owner.'
              testId='VaultDetailsDesktop.bir'
            />
          </OverflowTable.Head>
        </OverflowTable.Header>
        <VaultTableRow vault={vault} />
      </OverflowTable>
    </div>
  )
}

function VaultDetailList (props: PropsWithChildren<VaultDetailListProps>): JSX.Element {
  return (
    <div className='flex justify-between items-center mb-5' data-testid='VaultDetailList'>
      <InformationPopOver
        heading={props.heading}
        testId={props.testId}
        description={props.description}
      />
      {props.children}
    </div>
  )
}

export function InformationPopOver (props: InformationPopOverProps
): JSX.Element {
  return (
    <div className={classNames('flex space-x-1 items-center', props.className)} data-testid={props.testId}>
      <span className='font-medium'>{props.heading}</span>
      <HoverPopover popover={props.description}>
        <IoMdInformationCircleOutline className='h-4 w-4 text-secondary-300' />
      </HoverPopover>
    </div>
  )
}