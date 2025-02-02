import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
    
const F_JS = { display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }

const styles = StyleSheet.create({
    page: { padding: 30, fontSize: 8 },
    section: { marginBottom: 10 },

    table: { width: '100%', fontSize: 11 },
    row: { flexDirection: 'row', border: '1px solid black' },

    column: { textAlign: 'center', paddingHorizontal: 6, paddingVertical: 10 },
    footer: { marginTop: 20, fontSize: 10 },

    FS: { ...F_JS, width: '100%', height: '80' },
    header: { ...F_JS, width: '220', height: '100%', alignItems: 'center' },
    logo: { width: 50, height: 60, marginBottom: 10 },
    FS_ADD: { width: '140', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' },

    SS: { marginTop: 20, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' },
    TS: { marginTop: 20, display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' },
    FUS: { marginTop: 20, display: 'flex', flexDirection: 'row' },

});

const PDFDocument = ({ data }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.FS}>
                <View style={styles.header}>
                    <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCx-z95t5CJeb6CmFo2aqxpelS4QItpuV00w&s" style={styles.logo} />
                    <View style={styles.FS_ADD}>
                        <Text style={{ fontSize: 15 }}>NATURE DIAM INC</Text>
                        <Text style={{ textAlign: 'center' }}>{data.address}</Text>
                        <Text style={{ textAlign: 'center', marginTop: 10 }}>Tel: {data.phone}</Text>
                        <Text style={{ textAlign: 'center' }}>E-mail: {data.email}</Text>
                    </View>
                </View>

                <View style={{ height: 70, width: 120 }}>
                    <Text style={{ fontSize: 17, textAlign: 'center' }}>Memo</Text>
                    <View style={{ height: 50, width: "100%", border: '1 solid black', display: 'flex', marginTop: 4 }}>
                        <View style={{ height: '50%', display: 'flex', flexDirection: 'row', borderBottom: '1 solid black' }}>
                            <Text style={{ width: '50%', textAlign: 'center', padding: 6, borderRight: '1 solid black' }}>Date</Text>
                            <Text style={{ width: '50%', textAlign: 'center', padding: 6, }}>Memo</Text>
                        </View>
                        <View style={{ height: '50%', display: 'flex', flexDirection: 'row' }}>
                            <Text style={{ width: '50%', textAlign: 'center', padding: 6, borderRight: '1 solid black' }}>12/2/2222</Text>
                            <Text style={{ width: '50%', textAlign: 'center', padding: 6, }}>333</Text>
                        </View>
                    </View>
                </View>
            </View>

            <View style={styles.SS}>
                <View style={{ width: 200, height: 100, border: '1 solid black' }}>
                    <Text style={{ borderBottom: '1 solid black', padding: 6, fontSize: 12, fontWeight: 600 }}>Bill To</Text>
                    <View style={{ fontSize: 10, padding: 5 }}>
                        <Text style={{ marginBottom: 5 }}>Nirav Patel</Text>
                        <Text style={{ marginBottom: 5 }}>Ahmadabad</Text>
                        <Text style={{ marginBottom: 5 }}>+91 1234567890</Text>
                    </View>
                </View>
                <View style={{ width: 200, height: 100, border: '1 solid black' }}>
                    <Text style={{ borderBottom: '1 solid black', padding: 6, fontSize: 12, fontWeight: 600 }}>Ship To</Text>
                    <View style={{ fontSize: 10, padding: 5 }}>
                        <Text style={{ marginBottom: 5 }}>{`{{shipTo}}`}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.TS}>
                <View style={{ height: 70, width: 120 }}>
                    <View style={{ height: 50, width: "100%", border: '1 solid black', display: 'flex', marginTop: 4 }}>
                        <View style={{ height: '50%', display: 'flex', flexDirection: 'row', borderBottom: '1 solid black' }}>
                            <Text style={{ width: '50%', textAlign: 'center', padding: 6, borderRight: '1 solid black' }}>Terms</Text>
                            <Text style={{ width: '50%', textAlign: 'center', padding: 6, }}>Due Date</Text>
                        </View>
                        <View style={{ height: '50%', display: 'flex', flexDirection: 'row' }}>
                            <Text style={{ width: '50%', textAlign: 'center', padding: 6, borderRight: '1 solid black' }}>3 Days</Text>
                            <Text style={{ width: '50%', textAlign: 'center', padding: 6, }}>12/2/2222</Text>
                        </View>
                    </View>
                </View>
            </View>

            <View style={styles.table}>
                <View style={{ ...styles.row, borderBottom: 0 }}>
                    <Text style={{ ...styles.column, width: 70, borderRight: '1 solid black' }}>No</Text>
                    <Text style={{ ...styles.column, flex: 1, borderRight: '1 solid black' }}>Description</Text>
                    <Text style={{ ...styles.column, flex: 1, borderRight: '1 solid black' }}>Carat</Text>
                    <Text style={{ ...styles.column, flex: 1, borderRight: '1 solid black' }}>Price/Ct</Text>
                    <Text style={{ ...styles.column, width: 100 }}>Total</Text>
                </View>
                {
                    data.items.map(({ description, carats, pricePerCarat, amount }, index) => (
                        <View style={{ ...styles.row, borderBottom: 0 }}>
                            <Text style={{ ...styles.column, width: 70, borderRight: '1 solid black' }}>{index + 1}</Text>
                            <Text style={{ ...styles.column, flex: 1, borderRight: '1 solid black' }}>{description}</Text>
                            <Text style={{ ...styles.column, flex: 1, borderRight: '1 solid black' }}>{carats}</Text>
                            <Text style={{ ...styles.column, flex: 1, borderRight: '1 solid black' }}>{pricePerCarat}</Text>
                            <Text style={{ ...styles.column, width: 100 }}>{amount}</Text>
                        </View>
                    ))
                }
                <View style={{ ...styles.row }}>
                    <Text style={{ ...styles.column, width: 70, fontWeight: 600 }}>Total</Text>
                    <Text style={{ ...styles.column, flex: 1, borderRight: '1 solid black' }}></Text>
                    <Text style={{ ...styles.column, flex: 1, borderRight: '1 solid black', fontWeight: 600 }}>{data.totalCarats}</Text>
                    <Text style={{ ...styles.column, flex: 1, borderRight: '1 solid black' }}></Text>
                    <Text style={{ ...styles.column, width: 100, fontWeight: 600 }}>{data.totalAmount}</Text>
                </View>
            </View>

            <View style={styles.FUS}>
                <View style={{ width: 300, height: 100, border: '1 solid black' }}>
                    <Text style={{ borderBottom: '1 solid black', padding: 6, fontSize: 12, fontWeight: 600 }}>Bank Details</Text>
                    <View style={{ fontSize: 10, padding: 5, paddingBottom: 10 }}>
                        <Text style={{ marginBottom: 5 }}>{`Bank Name - {{company.bankInfo.name}}`}</Text>
                        <Text style={{ marginBottom: 5 }}>{`Bank Address - {{company.bankInfo.address}}`}</Text>
                        <Text style={{ marginBottom: 5 }}>{`A/C #: {{company.bankInfo.accountNumber}}`}</Text>
                        <Text style={{ marginBottom: 5 }}>{`Aba Routing No# - {{company.bankInfo.abaRoutingNumber}}`}</Text>
                        <Text style={{ marginBottom: 5 }}>{`Swift Code: {{company.bankInfo.swiftCode}}`}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.footer}>
                <Text>
                    I certify that the diamonds listed on this invoice have been purchased from legitimate sources not involved in funding conflict and in compliance with United Nations resolutions. These diamonds are guaranteed to be conflict-free, based on personal knowledge and/or written guarantees provided by the supplier. These diamonds are natural, formed and grown under geological processes unless specified otherwise. In compliance with the Diamond Source Warranty Protocol, Release Number 1-0, and the SRSPs, these diamonds have not been sourced from Zimbabwe Angola, any Specially Designated National and Blocked Person (SDNBP) as per the U.S. Department of Treasury OFAC list, nor have they been mined, extracted, produced, or manufactured, wholly or in part, in the Russian Federation. This certification remains valid even if such diamonds have been substantially transtormed into other products outside of the Russian Federation. We further warrant that no products containin tantalum, or diamonds are supplied from entitics substantally owned or donriciled in Russia or any cntities wholly or parily owned by sueh entities.
                </Text>
            </View>
        </Page>
    </Document>
);

export default PDFDocument;