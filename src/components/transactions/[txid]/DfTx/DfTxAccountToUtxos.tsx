import { DfTx, AccountToUtxos, TokenBalance } from '@defichain/jellyfish-transaction'
import { DfTxHeader } from '@components/transactions/[txid]/DfTx/DfTxHeader'
import { AdaptiveList } from '@components/commons/AdaptiveList'
import { fromScript } from '@defichain/jellyfish-address'
import { useNetworkContext } from '@contexts/NetworkContext'
import { TokenSymbol } from '@components/commons/TokenSymbol'

interface DfTxAccountToUtxosProps {
  dftx: DfTx<AccountToUtxos>
}

export function DfTxAccountToUtxos (props: DfTxAccountToUtxosProps): JSX.Element {
  const network = useNetworkContext().name
  const from = props.dftx.data.from !== undefined ? fromScript(props.dftx.data.from, network) : undefined

  return (
    <div>
      <DfTxHeader name='Account To Utxos' />
      <div className='mt-5 flex flex-col space-y-6 items-start lg:flex-row lg:space-x-8 lg:space-y-0'>
        <div className='w-full lg:w-1/2'>
          <DetailsTable
            fromAddress={from?.address}
            mintingOutputsStart={props.dftx.data.mintingOutputsStart}
          />
        </div>
        <div className='w-full lg:w-1/2'>
          <AdaptiveList>
            {props.dftx.data.balances.map(
              balance => (
                <BalanceRow balance={balance} key={`${balance.amount.toString()}-${balance.token}`} />
              )
            )}
          </AdaptiveList>
        </div>
      </div>
    </div>
  )
}

function DetailsTable (props: {
  fromAddress?: string
  mintingOutputsStart: number
}): JSX.Element {
  return (
    <AdaptiveList>
      <AdaptiveList.Row name='From' testId='DfTxAccountToUtxos.fromAddress'>
        {props.fromAddress ?? 'N/A'}
      </AdaptiveList.Row>
      <AdaptiveList.Row name='Minting Outputs Start' testId='DfTxAccountToUtxos.mintingOutputsStart'>
        {props.mintingOutputsStart ?? '-'}
      </AdaptiveList.Row>
    </AdaptiveList>
  )
}

function BalanceRow (props: {
  balance: TokenBalance
}): JSX.Element {
  return (
    <AdaptiveList.Row name='Balance'>
      <div className='flex flex-row'>
        <span data-testid='DfTxAccountToUtxos.balances'>{props.balance.amount.toFixed(8)}</span>
        <TokenSymbol tokenId={props.balance.token} className='ml-1' testId='DfTxAccountToUtxos.symbol' />
      </div>
    </AdaptiveList.Row>
  )
}
