import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import logo from '../public/evolve.png';
import axios from 'axios';
import ClipLoader from 'react-spinners/ClipLoader';

export default function Home() {
    const [stage, setStage] = useState(0);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [tel, setTel] = useState('');
    const [teamSize, setTeamSize] = useState('');
    const [businessName, setBusinessName] = useState('');
    const [salesTarget, setSalesTarget] = useState('100');
    const [dealID, setDealID] = useState(null);
    const [loading, setLoading] = useState(false);

    const submitHandler = async (event) => {
        event.preventDefault();
        if (stage === 0) {
            setLoading(true);
            const res = await axios.post('/api/stage01', {
                name,
                email,
                tel,
            });
            console.log(res.data);
            setDealID(res.data.dealID);
            setLoading(false);
        }
        if (stage === 1) {
            setLoading(true);
            await axios.post('/api/stage02', {
                teamSize,
                businessName,
                salesTarget,
                dealID,
            });
            setLoading(false);
        }

        setStage((prevState) => prevState + 1);

        if (stage > 1) {
            window.location.replace(
                `https://wa.me/3799485495?text=Olá,%20eu%20sou%20${name}%20e%20falo%20pela%20${businessName}.%20Hoje%20nós%20temos%20um%20time%20comercial%20de%20${teamSize}%20pessoas%20e%20%20uma%20meta%20de%20${
                    salesTarget >= 500
                        ? 'mais%20de%20'
                        : salesTarget <= 100
                        ? 'menos%20de%20'
                        : ''
                }${salesTarget}%20mil%20R$.%20Gostaria%20de%20entender%20como%20vocês%20podem%20ajudar%20a%20minha%20empresa%20a%20chegar%20lá!`
            );
        }
    };

    return (
        <>
            <Head>
                <title>Evolve Smart Sales</title>
                <meta
                    name='description'
                    content='Generated by create next app'
                />
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1, maximum-scale=1'
                />

                <link rel='icon' href='/favicon.ico' />
            </Head>
            <div className='App'>
                <Image src={logo} alt='logo' className='logo-img' />
                <form className='main-form' onSubmit={submitHandler}>
                    <h2>
                        Converse com um de nossos <span>especialistas!</span>
                    </h2>
                    {stage === 0 && (
                        <>
                            <label>
                                <span>Nome</span>
                                <input
                                    type='text'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </label>
                            <label>
                                <span>E-mail</span>
                                <input
                                    type='email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </label>
                            <label>
                                <span>Telefone</span>
                                <input
                                    type='text'
                                    value={tel}
                                    onChange={(e) => setTel(e.target.value)}
                                    required
                                />
                            </label>
                        </>
                    )}
                    {stage === 1 && (
                        <>
                            <label>
                                <span>Nome da sua empresa</span>
                                <input
                                    type='text'
                                    value={businessName}
                                    onChange={(e) =>
                                        setBusinessName(e.target.value)
                                    }
                                    required
                                />
                            </label>
                            <label>
                                <span>
                                    Qual é o tamanho do seu time comercial?
                                </span>
                                <input
                                    type='number'
                                    min={0}
                                    max={100}
                                    value={teamSize}
                                    onChange={(e) =>
                                        setTeamSize(e.target.value)
                                    }
                                    required
                                />
                            </label>
                            <label>
                                <span>Qual é a sua meta atual de vendas?</span>
                                <div>
                                    <p>
                                        {salesTarget >= 500
                                            ? 'Acima de'
                                            : salesTarget <= 100
                                            ? 'Abaixo de'
                                            : ''}{' '}
                                        {salesTarget} Mil R$
                                    </p>
                                    <input
                                        type='range'
                                        min={100}
                                        max={500}
                                        value={salesTarget}
                                        onChange={(e) =>
                                            setSalesTarget(e.target.value)
                                        }
                                        required
                                    />
                                </div>
                            </label>
                        </>
                    )}
                    <button>
                        {stage < 2 ? 'Continiar' : 'Converse agora!'}{' '}
                        {loading && (
                            <ClipLoader
                                color={'#ffffff'}
                                loading={loading}
                                size={15}
                                aria-label='Loading Spinner'
                                data-testid='loader'
                            />
                        )}
                    </button>
                </form>
            </div>
        </>
    );
}
