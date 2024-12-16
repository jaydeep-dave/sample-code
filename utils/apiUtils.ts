export function generateAPIEndpoint(accountNumber: string, amount: string): string {
    let URL: string = 'https://parabank.parasoft.com/parabank/services/bank/accounts/'+accountNumber+'/transactions/amount/'+amount
    console.log(URL)
    return URL;
}

