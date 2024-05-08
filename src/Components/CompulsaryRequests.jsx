import { useEffect, useState } from "react";
import { hash } from "../Utils/encrypt";

const CompulsaryRequests = ({ getCustomerDetailsRequest, receivedMessageHistory }) => {
    const [portfolios, setPortfolios] = useState([]);
    const [selectedPort, setSelectedPort] = useState({});

    useEffect(() => {
        receivedMessageHistory.forEach((msg) => {
            if (msg.HED.msgGrp === 10 && msg.HED.msgTyp === 103) {
                let response = msg.DAT;

                let secAccList = response.secAccLst;
                let cashAccList = response.cshAccLst;
                if (secAccList && secAccList.length) {
                    let accList = [];

                    secAccList.forEach((secAcc) => {
                        let acc = {};
                        acc.secAccNum = secAcc.secAccNum;
                        acc.cshAccNum = secAcc.cshAccNum;
                        acc.isMar = secAcc.isMar;
                        acc.curr = secAcc.curr;

                        if (cashAccList && cashAccList.length) {
                            let cashAcc = cashAccList.find((ca) => {
                                return acc.cshAccNum === ca.cshAccNum;
                            });

                            acc.cashAcc = cashAcc;
                        }

                        accList.push(acc);
                    });

                    setPortfolios(accList);
                    setSelectedPort(accList[0]);

                }


            }
        });
    }, [receivedMessageHistory.length]);

    const setCurrentPortfolio = (value) => {
        let portfolio = portfolios.find((port) => {
            return value === port.secAccNum;
        })

        setSelectedPort(portfolio);
    };
    return (
        <div className="flex flex-col flex-wrap mr-2 border mt-4 rounded-md w-2/5">
            <div className="px-2 py-1 w-full text-center">
                <h1 className="font-bold">Customer Details Response</h1>
            </div>

            <div className="px-2 pb-2 w-full text-center">
                <button type="button" className="btn btn-secondary" onClick={getCustomerDetailsRequest}>Get Customer Details</button>
            </div>
            <div className="px-2 pb-2 w-full text-center">
                <select className="select select-bordered w-full" value={selectedPort} onChange={(e) => setCurrentPortfolio(e.target.value)}>
                    <option disabled value="-1">Select Portfolio</option>
                    {portfolios.map((port) => {
                        return <option key={port.secAccNum} value={port.secAccNum}>{port.secAccNum} / {port.cshAccNum}</option>
                    })}
                </select>
            </div>
            <div className="flex flex-row px-2 py-1 w-full">
                <div className="w-2/12">
                    <div className="px-2 pb-2">
                        Currency
                    </div>
                </div>
                <div className="w-4/12">
                    <div className="px-2 pb-2 font-bold">
                        {selectedPort && selectedPort.curr}
                    </div>
                </div>
                <div className="w-2/12">
                    <div className="px-2 pb-2">
                        Margin
                    </div>
                </div>
                <div className="w-4/12">
                    <div className="px-2 pb-2 font-bold">
                    {(selectedPort && selectedPort.isMar === '1') ? 'Enabled' : 'Disabled'}
                    </div>
                </div>
            </div>
            <div className="flex flex-row px-2 py-1 w-full">
                <div className="w-2/12">
                    <div className="px-2 pb-2">
                        Cash Balance
                    </div>
                </div>
                <div className="w-4/12">
                    <div className="px-2 pb-2 font-bold">
                        {selectedPort && selectedPort.cashAcc && new Intl.NumberFormat('en-US', { style: 'currency', currency: selectedPort.curr }).format(selectedPort.cashAcc.balance)}
                    </div>
                </div>
                <div className="w-2/12">
                    <div className="px-2 pb-2">
                        Blocked Amount
                    </div>
                </div>
                <div className="w-4/12">
                    <div className="px-2 pb-2 font-bold">
                    {selectedPort && selectedPort.cashAcc && new Intl.NumberFormat('en-US', { style: 'currency', currency: selectedPort.curr }).format(selectedPort.cashAcc.blkAmt)}
                    </div>
                </div>
            </div>



        </div>
    )
}

export default CompulsaryRequests;