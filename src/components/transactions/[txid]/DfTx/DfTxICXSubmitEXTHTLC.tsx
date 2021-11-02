import { DfTx, ICXSubmitEXTHTLC } from '@defichain/jellyfish-transaction'
import { DfTxHeader } from '@components/transactions/[txid]/DfTx/DfTxHeader'
import { AdaptiveList } from '@components/commons/AdaptiveList'
import { AddressLink } from '@components/commons/AddressLink'

interface DfTxICXSubmitEXTHTLCProps {
  dftx: DfTx<ICXSubmitEXTHTLC>
}

export function DfTxICXSubmitEXTHTLC (props: DfTxICXSubmitEXTHTLCProps): JSX.Element {
  return (
    <div>
      <DfTxHeader name='ICX Submit EXTHTLC' />
      <div className='mt-5 flex flex-col space-y-6 items-start lg:flex-row lg:space-x-8 lg:space-y-0'>
        <AdaptiveList>
          <AdaptiveList.Row name='Offer Tx'>
            <span data-testid='DfTxICXSubmitEXTHTLC.OfferTx'>{props.dftx.data.offerTx}</span>
          </AdaptiveList.Row>
          <AdaptiveList.Row name='Hash'>
            <span data-testid='DfTxICXSubmitEXTHTLC.Hash'>{props.dftx.data.hash}</span>
          </AdaptiveList.Row>
          <AdaptiveList.Row name='Amount'>
            <span data-testid='DfTxICXSubmitEXTHTLC.Amount'>{props.dftx.data.amount.toFixed(8)}</span>
          </AdaptiveList.Row>
          <AdaptiveList.Row name='HTLC Script Address'>
            <span data-testid='DfTxICXSubmitEXTHTLC.HTLCScriptAddress'>{props.dftx.data.htlcScriptAddress}</span>
          </AdaptiveList.Row>
          <AdaptiveList.Row name='Owner Public Key'>
            <AddressLink address={props.dftx.data.ownerPubkey} testId='DfTxICXSubmitEXTHTLC.OwnerPubKey' />
          </AdaptiveList.Row>
          <AdaptiveList.Row name='Timeout'>
            <span data-testid='DfTxICXSubmitEXTHTLC.Timeout'>{props.dftx.data.timeout} Blocks</span>
          </AdaptiveList.Row>
        </AdaptiveList>
      </div>
    </div>
  )
}
