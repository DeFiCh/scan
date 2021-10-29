import { DfTx, AccountToAccount } from '@defichain/jellyfish-transaction'
import { DfTxHeader } from '@components/transactions/[txid]/DfTx/DfTxHeader'
import { AdaptiveList } from '@components/commons/AdaptiveList'
import { fromScript } from '@defichain/jellyfish-address'
import { useNetworkContext } from '@contexts/NetworkContext'
import { TokenSymbol } from '@components/commons/TokenSymbol'
import { TokenBalance } from '@defichain/jellyfish-transaction/dist/script/dftx/dftx_balance'

interface DfTxAccountToAccountProps {
  dftx: DfTx<AccountToAccount>
}

export function DfTxAccountToAccount (props: DfTxAccountToAccountProps): JSX.Element {
  const network = useNetworkContext().name
  const from = fromScript(props.dftx.data.from, network)

  return (
    <div>
      <DfTxHeader name='Account To Account' />
      <div className='mt-5 flex flex-col space-y-6 items-start lg:flex-row lg:space-x-8 lg:space-y-0'>
        <div className='w-full lg:w-1/2'>
          <FromTable fromAddress={from?.address} />
        </div>
        <div className='w-full lg:w-1/2'>
          {props.dftx.data.to.map(scriptBalances => {
            const toAddress = fromScript(scriptBalances.script, network)?.address ?? 'N/A'
            return (
              <AdaptiveList key={toAddress} className='mb-1'>
                <AdaptiveList.Row name='To' testId='DfTxAccountToAccount.to'>
                  {toAddress}
                </AdaptiveList.Row>
                {scriptBalances.balances.map(balance => {
                  return (
                    <BalanceRow balance={balance} key={`${balance.amount.toString()}-${balance.token}`} />
                  )
                })}
              </AdaptiveList>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function FromTable (props: {
  fromAddress?: string
}): JSX.Element {
  return (
    <AdaptiveList>
      <AdaptiveList.Row name='From' testId='DfTxAccountToAccount.fromAddress'>
        {props.fromAddress ?? 'N/A'}
      </AdaptiveList.Row>
    </AdaptiveList>
  )
}

function BalanceRow (props: {
  balance: TokenBalance
}): JSX.Element {
  return (
    <AdaptiveList.Row name='Amount'>
      <div className='flex flex-row'>
        <span data-testid='DfTxAccountToAccount.toAmount'>{props.balance.amount.toFixed(8)}</span>
        <TokenSymbol tokenId={props.balance.token} className='ml-1' testId='DfTxAccountToAccount.toSymbol' />
      </div>
    </AdaptiveList.Row>
  )
}
