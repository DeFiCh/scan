import { LoanVaultTokenAmount } from '@defichain/whale-api-client/dist/api/loan'
import { getAssetIcon } from '@components/icons/assets'
import classNames from 'classnames'

interface VaultTokenSymbolsProps {
  tokens: LoanVaultTokenAmount[]
  className?: string
}

export function VaultTokenSymbols (props: VaultTokenSymbolsProps): JSX.Element {
  const remainingTokens = props.tokens.length - 4

  return (
    <div className={classNames('flex items-center', props.className)}>
      {
        props.tokens.length === 0 && (<div className='text-gray-500 text-sm'>N/A</div>)
      }

      <div className='flex space-x-1 items-center'>
        {props.tokens.map((loan, index) => {
          const TokenIcon = getAssetIcon(loan.symbol)
          if (index < 4) {
            if (index >= 1) {
              return <TokenIcon className='h-6 w-6' key={loan.id} />
            }
            return <TokenIcon className='h-6 w-6' key={loan.id} />
          }
          return null
        })}
        {remainingTokens > 0 && (
          <span className='text-xs text-gray-500'>{`+${remainingTokens}`}</span>
        )}
      </div>
    </div>
  )
}
