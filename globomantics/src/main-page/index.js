import React, {Component} from 'react';
import './main-page.css';
import Header from './header';
import FeaturedHouse from './featured-house';
import HouseFilter from './house-filter';
import SearchResults from '../search-results';
import HouseDetail from '../house';


class App extends Component {

    // property initializer
    state = {};

    // this lifecycle method is called right after the component is mounted
    // (meaning adding the component to the tree, the DOM)
    componentDidMount() {
        this.fetchHouses();
    }

    fetchHouses = () => {

        fetch('/houses.json')
            .then(rsp => rsp.json())
            .then(allHouses => {
                    this.allHouses = allHouses;
                    this.getFeaturedHouse();
                    console.log(">> Fetched " + allHouses.length + " houses.");
                    this.getCountriesList();
                }
            )

    };

    getFeaturedHouse = () => {

        if (this.allHouses) {
            const randomIdx = Math.floor(Math.random() * this.allHouses.length)
            const featuredHouse = this.allHouses[ randomIdx ];
            this.setState({featuredHouse});
        }

    };

    getCountriesList = () => {

        const countries = this.allHouses ?
            Array.from(new Set(this.allHouses.map(h => h.country)))
            : [];
        countries.unshift(null);
        this.setState({countries});

    };

    filterHouse = (country) => {

        // when a new country is selected, there is no active house
        this.setState({activeHouse: null});

        const filteredHouses = this.allHouses.filter(h => h.country === country);
        this.setState({filteredHouses});
        this.setState({country});

    };

    setActiveHouse = (house) => {
        this.setState({activeHouse: house})
    };

    render() {

        let activeComp = null;
        if (this.state.country) {
            activeComp = <SearchResults country={this.state.country}
                                        filteredHouses={this.state.filteredHouses}
                                        setActiveHouse={this.setActiveHouse} />
        }
        if (this.state.activeHouse) {
            activeComp = <HouseDetail house={this.state.activeHouse} />
        }
        if (!activeComp) {
            activeComp = <FeaturedHouse house={this.state.featuredHouse} />
        }

        return (
            <div className="container">
                <Header subtitle="Providing houses all over the world" />
                <HouseFilter countries={this.state.countries} filterHouses={this.filterHouse} />
                {activeComp}
            </div>
        );

    }

}

export default App;
