import { LoanVaultTokenAmount } from '@defichain/whale-api-client/dist/api/loan'
import { getAssetIcon } from '@components/icons/assets'

interface VaultTokenSymbolsProps {
  tokens: LoanVaultTokenAmount[]
}

export function VaultTokenSymbols (props: VaultTokenSymbolsProps): JSX.Element {
  const remainingTokens = props.tokens.length - 3
  return (
    <div className='flex items-center gap-x-1'>
      <div className='flex'>
        {props.tokens.map((loan, index) => {
          const TokenIcon = getAssetIcon(loan.symbol)
          if (index < 3) {
            if (index >= 1) {
              return <TokenIcon className='h-6 w-6 -ml-2' />
            }
            return <TokenIcon className='h-6 w-6' />
          }
          return null
        })}
      </div>

      {remainingTokens > 0 && (
        <span className='text-xs text-gray-500'>{`+${remainingTokens}`}</span>
      )}
    </div>
  )
}